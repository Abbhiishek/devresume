import { ReactNode } from 'react';
// import CTA from "@/components/cta";
// import ReportAbuse from "@/components/report-abuse";
import { getSiteData } from '@/lib/fetchers';
import { fontMapper } from '@/styles/fonts';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const domain = decodeURIComponent(params.domain);
  const data = await getSiteData(domain);
  if (!data) {
    return null;
  }
  const {
    name: title,
    description,
    image,
    logo,
  } = data as {
    name: string;
    description: string;
    image: string;
    logo: string;
  };
  // Todo: To make sure that when user create thier site the user profile logo is used ....
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: data.twitterid || '@abhishekkushwaha',
    },
    icons: [logo],
    metadataBase: new URL(`https://${domain}`),
    // Optional: Set canonical URL to custom domain if it exists
    ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
      data.customDomain && {
        alternates: {
          canonical: `https://${data.customDomain}`,
        },
      }),
  };
}

export default async function HostedPortfolioLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const domain = decodeURIComponent(params.domain);
  const [data] = await Promise.all([getSiteData(domain)]);
  if (!data) {
    notFound();
  }

  // Optional: Redirect to custom domain if it exists
  if (
    domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    data.customDomain &&
    process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === 'true'
  ) {
    return redirect(`https://${data.customDomain}`);
  }

  return (
    <main
      className={`min-h-screen font-cal ${fontMapper[data.font]}`}
      suppressHydrationWarning
    >
      {children}
    </main>
  );
}
