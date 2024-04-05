import prisma from '@/lib/db';
import { replaceExamples, replaceTweets } from '@/lib/remark-plugins';
import { serialize } from 'next-mdx-remote/serialize';
import { unstable_cache } from 'next/cache';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
// make a typoe which extend Site and adds external data

export async function getSiteData(domain: string) {
  /**
   * Fetches site data from the database.
   * @returns A promise that resolves to the site data, including user, education, work experience, projects, certificates, blog, and tech stack.
   */
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;

  // console.log(subdomain)

  return await unstable_cache(
    async () => {
      const data = prisma.site.findUnique({
        where: subdomain ? { subdomain } : { customDomain: domain },
        include: {
          user: true,
          education: {
            orderBy: {
              school_start_date: 'desc',
            },
          },
          workexperience: {
            orderBy: {
              employment_start_date: 'desc',
            },
          },
          projects: true,
          certificates: true,
          Blog: true,
          siteTechStack: true,
        },
      });
      if (!data) return null;
      // const [aboutmdxSource] = await Promise.all([
      //     getMdxSource(data.about!),
      // ]);
      return {
        ...data,
      };
    },
    [`${domain}-metadata`],
    {
      revalidate: 900,
      tags: [`${domain}-metadata`],
    }
  )();
}

export async function getSiteAbout(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.site.findUnique({
        where: subdomain ? { subdomain } : { customDomain: domain },
        select: {
          about: true,
        },
      });

      if (!data) return null;
      const [mdxSource] = await Promise.all([getMdxSource(data.about!)]);
      return {
        ...data,
        mdxSource,
      };
    },
    [`${domain}-about`],
    {
      revalidate: 1,
      tags: [`${domain}-about`],
    }
  )();
}

export async function getBlogsForSite(domain: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;

  return await unstable_cache(
    async () => {
      return prisma.blog.findMany({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          published: true,
        },
        select: {
          title: true,
          description: true,
          slug: true,
          image: true,
          imageBlurhash: true,
          createdAt: true,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      });
    },
    [`${domain}-posts`],
    {
      revalidate: 900,
      tags: [`${domain}-posts`],
    }
  )();
}

export async function getBlogData(domain: string, slug: string) {
  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;

  return await unstable_cache(
    async () => {
      const data = await prisma.blog.findFirst({
        where: {
          site: subdomain ? { subdomain } : { customDomain: domain },
          slug,
          published: true,
        },
        include: {
          site: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!data) return null;

      const [mdxSource, adjacentPosts] = await Promise.all([
        getMdxSource(data.content!),
        prisma.blog.findMany({
          where: {
            site: subdomain ? { subdomain } : { customDomain: domain },
            published: true,
            NOT: {
              id: data.id,
            },
          },
          select: {
            slug: true,
            title: true,
            createdAt: true,
            description: true,
            image: true,
            imageBlurhash: true,
          },
        }),
      ]);

      return {
        ...data,
        mdxSource,
        adjacentPosts,
      };
    },
    [`${domain}-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`${domain}-${slug}`],
    }
  )();
}

async function getMdxSource(postContents: string) {
  // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
  // https://mdxjs.com/docs/what-is-mdx/#markdown
  const content =
    postContents?.replaceAll(/<(https?:\/\/\S+)>/g, '[$1]($1)') ?? '';
  // Serialize the content string into MDX
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [replaceTweets, () => replaceExamples(prisma)],
      rehypePlugins: [[rehypeSlug], rehypePrism],
    },
  });

  return mdxSource;
}
