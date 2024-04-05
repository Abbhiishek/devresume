import BlurImage from '@/components/blur-image';
import { TypographyH3 } from '@/components/common/Typography';
import { placeholderBlurhash } from '@/lib/utils';
import { Button } from '@nextui-org/react';
import { Site } from '@prisma/client';
import Link from 'next/link';

export default function PortfolioCard({ data }: { data: Site }) {
  const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  return (
    <div className="relative rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
      <Link
        href={`/dashboard/portfolio/${data.id}`}
        className="flex flex-col overflow-hidden rounded-lg"
      >
        <BlurImage
          alt={data.name ?? 'Card thumbnail'}
          width={500}
          height={400}
          className="h-44 object-cover"
          src={data.image ?? '/placeholder.png'}
          placeholder="blur"
          blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
        />
        <div className="border-t border-stone-200 p-4 dark:border-stone-700">
          <TypographyH3 className="my-0 truncate font-title text-xl font-bold tracking-wide dark:text-white">
            {data.name}
          </TypographyH3>
          <p className="my-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-4 flex w-full justify-between space-x-4 px-4">
        <Link
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.subdomain}.localhost:3000`
          }
          target="_blank"
          rel="noreferrer"
          className="w-full"
        >
          <Button
            radius="full"
            color="primary"
            variant="faded"
            className="w-full "
          >
            See in Action
          </Button>
        </Link>
      </div>
    </div>
  );
}
