// import BlogCard from "@/components/blog-card";
// import BlurImage from "@/components/blur-image";
import prisma from "@/lib/db";
import { getBlogsForSite, getSiteData } from "@/lib/fetchers";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const allSites = await prisma.site.findMany({
        select: {
            subdomain: true,
            customDomain: true,
        },
        // feel free to remove this filter if you want to generate paths for all sites
        where: {
            subdomain: "demo",
        },
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
    const [data, posts] = await Promise.all([
        getSiteData(domain),
        getBlogsForSite(domain),
    ]);

    if (!data) {
        notFound();
    }
    return (
        <main className="container text-center flex  flex-col justify-center items-center ">
            <h1 className="font-title">Welcome to {data.name} portfolio</h1>
            <Image
                src={data.user?.avatar!}
                width={500}
                height={500}
                className="rounded-full w-[500px] h-[500px]"
                alt={data.user?.firstname!}
            />
            <div className="w-full">

                {
                    JSON.stringify({
                        data
                    }, null, 2)
                }

            </div>
        </main>
    );
}
