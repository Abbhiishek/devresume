import AllBlogs from '@/components/dashboard/portfolio/blog/all-blogs';
import CreateBlogButton from '@/components/dashboard/portfolio/blog/create-blog-button';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

export default async function SiteBlogsPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = auth();

  if (!session.userId) {
    redirect('/sign-in');
  }

  const data = await prisma.site.findUnique({
    where: {
      id: decodeURIComponent(params.slug),
    },
  });

  if (!data || data.userId !== session.userId) {
    notFound();
  }

  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <>
      <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <h1 className="w-60 truncate font-cal text-xl font-bold dark:text-white sm:w-auto sm:text-3xl">
            All Posts for {data.name}
          </h1>
        </div>
        <CreateBlogButton />
      </div>
      <AllBlogs siteId={decodeURIComponent(params.slug)} />
    </>
  );
}
