import { TypographyH1, TypographyH3 } from '@/components/common/Typography';
import PortfolioAnaytlics from '@/components/dashboard/portfolio/PortfolioAnaytlics';
import UserAgentsAnalytics from '@/components/dashboard/portfolio/UserAgentsAnalytics';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { notFound, redirect } from 'next/navigation';

async function AnalyticsPage({ params }: { params: { slug: string } }) {
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
    <div>
      <TypographyH1>Analytics 🔍🐬</TypographyH1>
      <TypographyH3 className="my-4 opacity-70">
        Portfolio Insights 🔍
      </TypographyH3>
      <PortfolioAnaytlics siteid={data.id} />
      <br />
      <br />
      <UserAgentsAnalytics siteid={data.id} />
    </div>
  );
}

export default AnalyticsPage;
