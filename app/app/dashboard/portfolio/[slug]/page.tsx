import { TypographyH1, TypographyH2 } from '@/components/common/Typography';
import BlogAnalytics from '@/components/dashboard/portfolio/BlogAnalytics';
import PortfolioAnaytlics from '@/components/dashboard/portfolio/PortfolioAnaytlics';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
async function SinglePortfolioPage({ params }: { params: { slug: string } }) {
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
    <div className="pb-10">
      <Link
        href={
          process.env.NEXT_PUBLIC_VERCEL_ENV
            ? `https://${url}`
            : `http://${data.subdomain}.localhost:3000`
        }
        target="_blank"
      >
        <Button variant="bordered" color="primary">
          <h1>
            🔗{'  '}
            {url} 🎉
          </h1>
        </Button>
      </Link>
      <TypographyH1 className="my-4 opacity-70">
        Portfolio Insights 🔍
      </TypographyH1>
      <PortfolioAnaytlics siteid={data.id} />
      <TypographyH2 className="my-4 opacity-70">Blogs Insights 🔍</TypographyH2>
      <BlogAnalytics siteid={data.id} />
    </div>
  );
}

export default SinglePortfolioPage;
