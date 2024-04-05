/* eslint-disable @next/next/no-img-element */

import prisma from '@/lib/edgedb';
import { truncate } from '@/lib/utils';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
type PostOGResponse = {
  title: string;
  description: string;
  image: string;
  authorName: string;
  authorImage: string;
};
export default async function PostOG({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);

  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
    : null;

  const response = await prisma.$queryRaw`
        SELECT blog.title, blog.description, blog.image, 
        "user".firstname as "authorName", "user".avatar as "authorImage"
        FROM "blog" AS blog 
        INNER JOIN "Site" AS site ON blog."siteId" = site.id 
        INNER JOIN "user" AS "user" ON site."userId" = "user".id 
        WHERE 
          (
              site.subdomain = ${subdomain}
              OR site."customDomain" = ${domain}
          )
          AND blog.slug = ${slug}
        LIMIT 1;
      `;
  console.log('response ====>', response);

  const data = (response as PostOGResponse[])[0];

  if (!data) {
    return new Response('Not found', { status: 404 });
  }

  const clashData = await fetch(
    new URL('@/styles/CalSans-SemiBold.otf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center w-full h-full bg-white">
        <div tw="flex flex-col items-center justify-center mt-8">
          <h1 tw="text-6xl font-bold text-gray-900 leading-none tracking-tight">
            {data.title}
          </h1>
          <p tw="mt-4 text-xl text-gray-600 max-w-xl text-center">
            {truncate(data.description, 120)}
          </p>
          <div tw="flex items-center justify-center">
            <img
              tw="w-12 h-12 rounded-full mr-4"
              src={data.authorImage}
              alt={data.authorName}
            />
            <p tw="text-xl font-medium text-gray-900">by {data.authorName} </p>
          </div>
          <img
            tw="mt-4 w-5/6 rounded-2xl border border-gray-200 shadow-md"
            src={data.image}
            alt={data.title}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Clash',
          data: clashData,
        },
      ],
      emoji: 'blobmoji',
    }
  );
}
