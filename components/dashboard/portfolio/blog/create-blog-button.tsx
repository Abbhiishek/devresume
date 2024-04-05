'use client';

import { createPost } from '@/lib/actions';
import { cn } from '@/lib/utils';
import va from '@vercel/analytics';
import { LoaderIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function CreateBlogButton() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          const post = await createPost(null, slug, null);
          va.track('Created Blog');
          router.refresh();
          router.push(`/dashboard/portfolio/${slug}/blog/${post.id}`);
        })
      }
      className={cn(
        'flex h-8 w-36 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none sm:h-9',
        isPending
          ? 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
          : 'border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800'
      )}
      disabled={isPending}
    >
      {isPending ? (
        <LoaderIcon className="animate-spin" color="#808080" />
      ) : (
        <p>Create New Blog</p>
      )}
    </button>
  );
}
