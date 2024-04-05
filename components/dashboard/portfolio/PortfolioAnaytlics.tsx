import { getSitesAnalytics } from '@/lib/analytics';
import prisma from '@/lib/db';
import { Card } from '@tremor/react';
import PorfolioBarChart from './PorfolioBarChart';

async function PortfolioAnaytlics({ siteid }: { siteid: string }) {
  const analayticsdata = await getSitesAnalytics(siteid, 7);
  const site = await prisma?.site.findUnique({
    where: {
      id: siteid,
    },
    select: {
      totalviews: true,
    },
  });
  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        <Card
          className="mx-auto max-w-xs "
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Portfolio All Time View
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {site?.totalviews?.toString() ?? ''}
          </p>
        </Card>
        <Card
          className="mx-auto max-w-xs "
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Last 30 Days
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {analayticsdata.monthviews.toString() ?? ''}
          </p>
        </Card>
        <Card
          className="mx-auto max-w-xs "
          decoration="top"
          decorationColor="indigo"
        >
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Avg/30days View
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {analayticsdata.monthavgviews?.toString() ?? ''}
          </p>
        </Card>
      </div>

      <div className="mt-10 flex flex-col lg:flex-row justify-start items-center w-full gap-4">
        <PorfolioBarChart data={analayticsdata.analytics} />
        <div className="lg:basis-2/6  w-full flex-col flex  justify-start items-start gap-3 h-full">
          <Card
            className="mx-auto max-w-xs h-full"
            decoration="top"
            decorationColor="indigo"
          >
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Week View
            </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {analayticsdata.weekviews?.toString() ?? ''}
            </p>
          </Card>
          <Card
            className="mx-auto max-w-xs h-full"
            decoration="top"
            decorationColor="indigo"
          >
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Avg/Week View
            </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {analayticsdata.weekavgviews?.toString() ?? ''}
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default PortfolioAnaytlics;
