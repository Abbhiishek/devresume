import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export function withSiteAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null
  ) => {
    const session = auth();
    if (!session.userId) {
      return {
        error: 'Not authenticated',
      };
    }
    const site = await prisma.site.findUnique({
      where: {
        id: siteId,
      },
    });
    if (!site || site.userId !== session.userId) {
      return {
        error: 'Not authorized',
      };
    }

    return action(formData, site, key);
  };
}

export function withBlogAuth(action: any) {
  return async (
    formData: FormData | null,
    postId: string,
    key: string | null
  ) => {
    const session = auth();
    if (!session.userId) {
      return {
        error: 'Not authenticated',
      };
    }
    const post = await prisma.blog.findUnique({
      where: {
        id: postId,
      },
      include: {
        site: true,
      },
    });
    if (!post || post.userId !== session.userId) {
      return {
        error: 'Post not found',
      };
    }

    return action(formData, post, key);
  };
}

export function withEducationAuth(action: any) {
  return async (
    postId: number,
    key: string | null,
    formdata: FormData | null
  ) => {
    const session = auth();
    if (!session.userId) {
      return {
        error: 'Not authenticated',
      };
    }
    const post = await prisma.userEducation.findUnique({
      where: {
        id: postId,
      },
      include: {
        site: true,
      },
    });
    if (!post || post.user_id !== session.userId) {
      return {
        error: 'education not found',
      };
    }

    return action(post, key, formdata);
  };
}

export function withWorkAuth(action: any) {
  return async (
    postId: number,
    key: string | null,
    formdata: FormData | null
  ) => {
    const session = auth();
    if (!session.userId) {
      return {
        error: 'Not authenticated',
      };
    }
    const post = await prisma.userWorkExperience.findUnique({
      where: {
        id: postId,
      },
      include: {
        site: true,
      },
    });
    if (!post || post.user_id !== session.userId) {
      return {
        error: 'work not found',
      };
    }

    return action(post, key, formdata);
  };
}

export function withProjectAuth(action: any) {
  return async (
    postId: number,
    key: string | null,
    formdata: FormData | null
  ) => {
    const session = auth();
    if (!session.userId) {
      return {
        error: 'Not authenticated',
      };
    }
    const post = await prisma.projects.findUnique({
      where: {
        id: postId,
      },
      include: {
        site: true,
      },
    });
    if (!post || post.user_id !== session.userId) {
      return {
        error: 'project not found',
      };
    }

    return action(post, key, formdata);
  };
}

export function withCertificateAuth(action: any) {
  return async (
    postId: number,
    key: string | null,
    formdata: FormData | null
  ) => {
    const session = auth();
    if (!session.userId) {
      return {
        error: 'Not authenticated',
      };
    }
    const post = await prisma.userCertificate.findUnique({
      where: {
        id: postId,
      },
      include: {
        site: true,
      },
    });
    if (!post || post.user_id !== session.userId) {
      return {
        error: 'certificate not found',
      };
    }

    return action(post, key, formdata);
  };
}
