import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const session = auth();
  if (!session) {
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
    <div className="flex max-w-screen-xl flex-col space-y-12">{children}</div>
  );
}
