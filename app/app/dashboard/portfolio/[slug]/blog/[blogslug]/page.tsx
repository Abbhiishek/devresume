import BlogEditor from '@/components/dashboard/portfolio/blog/blog-editor';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

export default async function BlogPage({
  params,
}: {
  params: { blogslug: string };
}) {
  const session = auth();

  if (!session) {
    redirect('/sign-in');
  }

  const data = await prisma.blog.findUnique({
    where: {
      id: decodeURIComponent(params.blogslug),
    },
    include: {
      site: {
        select: {
          subdomain: true,
        },
      },
    },
  });
  if (!data || data.userId !== session.userId) {
    notFound();
  }

  return <BlogEditor blog={data} />;
}
