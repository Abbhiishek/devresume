import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import PortfolioCard from './PortfolioCard';

export default async function AllPortfolioLayout({
  limit,
}: {
  limit?: number;
}) {
  const session = auth();
  if (!session.userId) {
    redirect('/');
  }
  const sites = await prisma.site.findMany({
    where: {
      user: {
        id: session.userId as string,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
    ...(limit ? { take: limit } : {}),
  });

  return sites.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {sites.map((site) => (
        <PortfolioCard key={site.id} data={site} />
      ))}
    </div>
  ) : (
    <div className="mt-10 flex flex-col items-center space-x-4">
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/gray/web-design.svg"
        width={400}
        height={400}
        className="rounded-lg"
      />
      <p className="text-lg text-stone-500">
        You do not have any Portfolio yet. Create one to get started.
      </p>
    </div>
  );
}
