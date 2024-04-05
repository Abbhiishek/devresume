'use client';

import { deletePost } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import va from '@vercel/analytics';
import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';

export default function DeletePostForm({ postName }: { postName: string }) {
  const { blogslug, slug } = useParams() as { blogslug: string; slug: string };
  const router = useRouter();
  return (
    <form
      action={async (data: FormData) =>
        window.confirm('Are you sure you want to delete your post?') &&
        deletePost(data, blogslug, 'delete').then((res) => {
          if (res.error) {
            toast.error('An error occurred.');
          } else {
            va.track('Deleted Post');
            router.refresh();
            router.push(`/dashboard/portfolio/${slug}/blog`);
            toast.success('Blog Deleted !');
          }
        })
      }
      className="rounded-lg border border-red-600 bg-white dark:bg-black"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <h2 className="font-title text-xl dark:text-white">Delete Post</h2>
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Deletes your post permanently. Type in the name of your post{' '}
          <b>{postName}</b> to confirm.
        </p>

        <Input
          name="confirm"
          type="text"
          required
          pattern={postName}
          placeholder={postName}
          className="w-full max-w-md  text-sm text-stone-900 placeholder-stone-300   dark:bg-black dark:text-white dark:placeholder-stone-700"
        />
      </div>

      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-center text-sm text-stone-500 dark:text-stone-400">
          This action is irreversible. Please proceed with caution.
        </p>
        <div className="w-32">
          <FormButton />
        </div>
      </div>
    </form>
  );
}

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        'flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10',
        pending
          ? 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
          : 'border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 dark:hover:bg-transparent'
      )}
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        <p>Confirm Delete</p>
      )}
    </button>
  );
}
