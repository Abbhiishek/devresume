'use server';

import prisma from '@/lib/db';
import { Blog, Site, UserEducation } from '@prisma/client';
import { nanoid } from 'nanoid';
import { revalidateTag } from 'next/cache';

import {
  addDomainToVercel,
  // getApexDomain,
  removeDomainFromVercelProject,
  // removeDomainFromVercelTeam,
  validDomainRegex,
} from '@/lib/domains';
import { getBlurDataURL } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import { UTApi } from 'uploadthing/server';
import {
  withBlogAuth,
  withEducationAuth,
  withSiteAuth,
  withWorkAuth,
} from './auth';
const utapi = new UTApi();

export const createSite = async (formData: FormData) => {
  const session = auth();
  if (!session.userId) {
    return {
      error: 'Not authenticated',
    };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const subdomain = formData.get('subdomain') as string;
  const logo = 'https://app.dresume.me/placeholder.png';
  try {
    const userdata = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        avatar: true,
      },
    });

    if (!userdata?.avatar) {
      return {
        error: 'kindly upload your picture in settings',
      };
    }

    const response = await prisma.site.create({
      data: {
        name,
        description,
        subdomain,
        logo: userdata?.avatar,
        user: {
          connect: {
            id: session.userId,
          },
        },
      },
    });
    await revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );
    return response;
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {
        error: `This subdomain is already taken`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateSite = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {
    // const value = formData.get(key) as string;

    const session = auth();
    if (!session.userId) {
      return {
        error: 'Not authenticated',
      };
    }

    try {
      let response;

      if (key === 'customDomain') {
        const value = formData.get(key) as string;
        if (value.includes('dresume.me')) {
          return {
            error: 'Cannot use dresume.me subdomain as your custom domain',
          };

          // if the custom domain is valid, we need to add it to Vercel
        } else if (validDomainRegex.test(value)) {
          response = await prisma.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: value,
            },
          });
          await Promise.all([
            addDomainToVercel(value),
            // Optional: add www subdomain as well and redirect to apex domain
            // addDomainToVercel(`www.${value}`),
          ]);

          // empty value means the user wants to remove the custom domain
        } else if (value === '') {
          response = await prisma.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: null,
            },
          });
        }

        // if the site had a different customDomain before, we need to remove it from Vercel
        if (site.customDomain && site.customDomain !== value) {
          response = await removeDomainFromVercelProject(site.customDomain);
        }
      } else if (key === 'image' || key === 'logo') {
        const value = formData.get(key) as string;
        if (!process.env.UPLOADTHING_SECRET) {
          return {
            error:
              'Missing UPLOADTHING_SECRET token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd',
          };
        }
        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split('/')[1]}`;

        // const { url } = await Uploader(filename, file, {
        //     access: "public",
        // });

        const res = await utapi.uploadFiles(file);

        if (res.error) {
          return {
            error: res.error,
          };
        }

        // console.log("after image upload", res)

        const blurhash =
          key === 'image' ? await getBlurDataURL(res.data?.url) : null;

        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: res.data?.url,
            ...(blurhash && { imageBlurhash: blurhash }),
          },
        });
      } else if (key === 'socials') {
        const twitterid = formData.get('twitterid') as string;
        const githubid = formData.get('githubid') as string;
        const linkedinid = formData.get('linkedinid') as string;
        const instagramid = formData.get('instagramid') as string;
        const youtubeurl = formData.get('youtubeurl') as string;
        const websiteurl = formData.get('websiteurl') as string;
        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            twitterid,
            githubid,
            linkedinid,
            instagramid,
            youtubeurl,
            websiteurl,
          },
        });
      } else if (key === 'skills') {
        const skills = formData.getAll(key) as string[];
        console.log(skills);
        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            skills,
          },
        });
      } else {
        const value = formData.get(key) as string;
        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: value,
          },
        });
      }
      console.log(
        'Updated site data! Revalidating tags: ',
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
        `${site.customDomain}-metadata`
      );
      await revalidateTag(
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
      );
      site.customDomain &&
        (await revalidateTag(`${site.customDomain}-metadata`));

      return response;
    } catch (error: any) {
      if (error.code === 'P2002') {
        return {
          error: `This ${key} is already taken`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  }
);

export const deleteSite = withSiteAuth(async (_: FormData, site: Site) => {
  try {
    const response = await prisma.site.delete({
      where: {
        id: site.id,
      },
    });
    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );
    response.customDomain &&
      (await revalidateTag(`${site.customDomain}-metadata`));
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const getSiteFromPostId = async (postId: string) => {
  const post = await prisma.blog.findUnique({
    where: {
      id: postId,
    },
    select: {
      siteId: true,
    },
  });
  return post?.siteId;
};

export const createPost = withSiteAuth(async (_: FormData, site: Site) => {
  const UserId = auth();
  if (!UserId?.userId) {
    return {
      error: 'Not authenticated',
    };
  }
  const response = await prisma.blog.create({
    data: {
      siteId: site.id,
      userId: UserId?.userId,
    },
  });

  await revalidateTag(
    `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`
  );
  site.customDomain && (await revalidateTag(`${site.customDomain}-posts`));

  return response;
});

// creating a separate function for this because we're not using FormData
export const updatePost = async (data: Blog) => {
  const UserId = auth();
  if (!UserId?.userId) {
    return {
      error: 'Not authenticated',
    };
  }
  const post = await prisma.blog.findUnique({
    where: {
      id: data.id,
    },
    include: {
      site: true,
    },
  });
  if (!post || post.userId !== UserId.userId) {
    return {
      error: 'Post not found',
    };
  }
  try {
    const response = await prisma.blog.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
      },
    });

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`
    );
    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-posts`),
      await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updatePostMetadata = withBlogAuth(
  async (
    formData: FormData,
    blog: Blog & {
      site: Site;
    },
    key: string
  ) => {
    const value = formData.get(key) as string;

    try {
      let response;
      if (key === 'image') {
        const file = formData.get('image') as File;
        const filename = `${nanoid(7)}.${file.type.split('/')[1]}`;

        const res = await utapi.uploadFiles(file, {
          metadata: {
            title: blog.title,
            description: blog.description,
          },
        });
        // const { url, } = await put(filename, file, {
        //     access: "public",
        // });

        if (res.error) {
          return {
            error: res.error,
          };
        }

        const blurhash = await getBlurDataURL(res.data.url);

        response = await prisma.blog.update({
          where: {
            id: blog.id,
          },
          data: {
            image: res.data.url,
            imageBlurhash: blurhash,
          },
        });
      } else {
        response = await prisma.blog.update({
          where: {
            id: blog.id,
          },
          data: {
            [key]: key === 'published' ? value === 'true' : value,
          },
        });
      }

      await revalidateTag(
        `${blog.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`
      );
      await revalidateTag(
        `${blog.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${blog.slug}`
      );

      // if the site has a custom domain, we need to revalidate those tags too
      blog.site?.customDomain &&
        (await revalidateTag(`${blog.site?.customDomain}-posts`),
        await revalidateTag(`${blog.site?.customDomain}-${blog.slug}`));

      return response;
    } catch (error: any) {
      if (error.code === 'P2002') {
        return {
          error: `This slug is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  }
);

export const deletePost = withBlogAuth(async (_: FormData, blog: Blog) => {
  try {
    const response = await prisma.blog.delete({
      where: {
        id: blog.id,
      },
      select: {
        siteId: true,
      },
    });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const editUser = async (
  formData: FormData,
  _id: unknown,
  key: string
) => {
  const UserId = auth();
  if (!UserId?.userId) {
    return {
      error: 'Not authenticated',
    };
  }
  const value = formData.get(key) as string;

  try {
    let response;

    if (key === 'avatar') {
      if (!process.env.UPLOADTHING_SECRET) {
        return {
          error: 'Missing UPLOADTHING_SECRET token.',
        };
      }
      const file = formData.get(key) as File;
      const filename = `${nanoid(7)}.${file.type.split('/')[1]}`;

      const res = await utapi.uploadFiles(file);

      if (res.error) {
        return {
          error: res.error,
        };
      }

      // const { url } = await put(filename, file, {
      //     access: "public",
      // });

      // const blurhash = await getBlurDataURL(url);

      response = await prisma.user.update({
        where: {
          id: UserId.userId,
        },
        data: {
          avatar: res.data.url,
        },
      });
    } else {
      response = await prisma.user.update({
        where: {
          id: UserId.userId,
        },
        data: {
          [key]: value,
        },
      });
    }
    return response;
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {
        error: `This ${key} is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateAboutSite = async (about: string, id: string) => {
  const session = auth();
  if (!session.userId) {
    return {
      error: 'Not authenticated',
    };
  }

  try {
    const response = await prisma.site.update({
      where: {
        id: id,
      },
      data: {
        about: about,
      },
    });

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const addEducation = async (
  formData: FormData,
  key: string,
  slug: string
) => {
  const session = auth();
  if (!session.userId) {
    return {
      error: 'Not authenticated',
    };
  }
  const school_name = formData.get('school_name') as string;
  const school_location = formData.get('school_location') as string;
  const school_degree = formData.get('school_degree') as string;
  const school_major = formData.get('school_major') as string;
  const school_start_date = formData.get('school_start_date') as string;
  const school_end_date = formData.get('school_end_date') as string;
  const education_note = formData.get('education_note') as string;

  try {
    let response;
    response = await prisma.userEducation.create({
      data: {
        user_id: session.userId,
        school_name,
        school_location,
        school_degree,
        school_major,
        school_start_date: new Date(school_start_date),
        school_end_date: new Date(school_end_date),
        education_note,
        site: {
          connect: {
            id: slug,
          },
        },
      },
    });
    return response;
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {
        error: `something happend unexpected 😢`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateEducation = withEducationAuth(
  async (education: UserEducation, key: string, formdata: FormData) => {
    try {
      const response = await prisma.userEducation.update({
        where: {
          id: education.id,
        },
        data: {
          school_degree: formdata.get('school_degree') as string,
          school_major: formdata.get('school_major') as string,
          school_name: formdata.get('school_name') as string,
          school_location: formdata.get('school_location') as string,
          school_start_date: new Date(
            formdata.get('school_start_date') as string
          ),
          school_end_date: new Date(formdata.get('school_end_date') as string),
          education_note: formdata.get('education_note') as string,
        },
      });
      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
);

export const deleteEducation = withEducationAuth(
  async (education: UserEducation) => {
    try {
      const response = await prisma.userEducation.delete({
        where: {
          id: education.id,
        },
        select: {
          siteId: true,
        },
      });
      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
);

export const addWorkExperience = async (
  formData: FormData,
  key: string,
  slug: string
) => {
  const session = auth();
  if (!session.userId) {
    return {
      error: 'Not authenticated',
    };
  }
  const company_name = formData.get('company_name') as string;
  const company_location = formData.get('company_location') as string;
  const employment_position = formData.get('employment_position') as string;
  const employment_start_date = formData.get('employment_start_date') as string;
  const employment_end_date = formData.get('employment_end_date') as string; // string | ""
  const employment_type = formData.get('employment_type') as string;
  const description = formData.get('description') as string;

  try {
    let response;
    response = await prisma.userWorkExperience.create({
      data: {
        user_id: session.userId,
        company_name,
        company_location,
        employment_position,
        employment_start_date: new Date(employment_start_date),
        // check ig employement_end_data is null then give it null
        employment_end_date:
          employment_end_date === '' ? null : new Date(employment_end_date),
        still_working: employment_end_date === '' ? true : false,
        descriptions: description || null,
        employment_type,
        site: {
          connect: {
            id: slug,
          },
        },
      },
    });
    return response;
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {
        error: `something happend unexpected 😢`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateWorkExperience = withWorkAuth(
  async (work: any, key: string, formdata: FormData) => {
    try {
      const response = await prisma.userWorkExperience.update({
        where: {
          id: work.id,
        },
        data: {
          company_name: formdata.get('company_name') as string,
          company_location: formdata.get('company_location') as string,
          employment_position: formdata.get('employment_position') as string,
          employment_start_date: new Date(
            formdata.get('employment_start_date') as string
          ),
          employment_end_date: !formdata.get('employment_end_date')
            ? null
            : new Date(formdata.get('employment_end_date') as string),
          still_working: !formdata.get('employment_end_date') ? true : false,
          descriptions: formdata.get('description') as string,
          employment_type: formdata.get('employment_type') as string,
        },
      });
      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
);

export const deleteWorkExperience = withWorkAuth(async (work: any) => {
  try {
    const response = await prisma.userWorkExperience.delete({
      where: {
        id: work.id,
      },
      select: {
        siteId: true,
      },
    });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const updateSiteTechStack = withSiteAuth(
  async (formData: FormData, slug: Site, Key: string) => {
    const session = auth();
    if (!session.userId) {
      return {
        error: 'Not authenticated',
      };
    }

    const techstacks = formData.getAll('techstack') as string[];

    try {
      let response;
      if (techstacks.length === 0) {
        console.log('deleting all techstacks for site', slug.id);
        return prisma.siteTechStack.deleteMany({
          where: {
            siteId: slug.id,
          },
        });
      }

      const alltechstack = await prisma.techStack.findMany();
      const alltechstackids = alltechstack.map((tech) => tech.id.toString());
      const toDelete = alltechstackids.filter(
        (tech) => !techstacks.includes(tech)
      );
      const toAdd = techstacks.filter((tech) => alltechstackids.includes(tech));
      response = await Promise.all([
        prisma.siteTechStack.deleteMany({
          where: {
            siteId: slug.id,
            techStackId: {
              in: toDelete.map((id) => Number(id)),
            },
          },
        }),

        toAdd.map(async (tech) => {
          return prisma.siteTechStack.upsert({
            where: {
              siteId_techStackId: {
                siteId: slug.id,
                techStackId: Number(tech),
              },
            },
            create: {
              siteId: slug.id,
              techStackId: Number(tech),
            },
            update: {
              siteId: slug.id,
              techStackId: Number(tech),
            },
          });
        }),
      ]);
      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
);
