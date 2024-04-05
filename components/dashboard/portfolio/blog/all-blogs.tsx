import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import BlogCard from './blog-card';

export default async function AllBlogs({
  siteId,
  limit,
}: {
  siteId?: string;
  limit?: number;
}) {
  const session = auth();
  if (!session?.userId) {
    redirect('/sign-in');
  }
  const posts = await prisma.blog.findMany({
    where: {
      userId: session.userId as string,
      ...(siteId ? { siteId } : {}),
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      site: true,
    },
    ...(limit ? { take: limit } : {}),
  });

  return posts.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} data={post} slug={siteId!} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Posts Yet</h1>
      <Image
        alt="missing post"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any posts yet. Create one to get started.
      </p>
    </div>
  );
}
