import DefaultTheme from '@/components/themes/DefaultTheme';
import prisma from '@/lib/db';
import { getSiteAbout, getSiteData } from '@/lib/fetchers';
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const allSites = await prisma.site.findMany({
    select: {
      subdomain: true,
      customDomain: true,
    },
    // feel free to remove this filter if you want to generate paths for all sites
    // where: {
    //     subdomain: "demo",
    // },
  });

  const allPaths = allSites
    .flatMap(({ subdomain, customDomain }) => [
      subdomain && {
        domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
      },
      customDomain && {
        domain: customDomain,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const [data, aboutdata] = await Promise.all([
    getSiteData(domain),
    getSiteAbout(domain),
  ]);

  if (!data) {
    notFound();
  }
  return (
    <>
      {/* {data.theme} */}
      <DefaultTheme sitedata={data!} about={aboutdata!} />
    </>
  );
}
