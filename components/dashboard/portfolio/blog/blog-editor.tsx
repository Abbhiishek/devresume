'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { updatePost, updatePostMetadata } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Blog } from '@prisma/client';
import { ExternalLink, Loader2Icon } from 'lucide-react';
import { Editor as NovelEditor } from 'novel';
import { useEffect, useState, useTransition } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'sonner';

type PostWithSite = Blog & { site: { subdomain: string | null } | null };

export default function BlogEditor({ blog }: { blog: PostWithSite }) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<PostWithSite>(blog);
  const [hydrated, setHydrated] = useState(false);

  const url = process.env.NEXT_PUBLIC_VERCEL_ENV
    ? `https://${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/blog/${data.slug}`
    : `http://${data.site?.subdomain}.localhost:3000/blog/${data.slug}`;

  // listen to CMD + S and override the default behavior
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 's') {
        e.preventDefault();
        startTransitionSaving(async () => {
          await updatePost(data);
        });
      }
      if (e.metaKey && e.key === 'v') {
        e.preventDefault();
        startTransitionPublishing(async () => {
          toast.success('pasting from clipboard');
        });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [data, startTransitionSaving]);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 dark:border-stone-700 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
      <div className="absolute right-5 top-5 mb-5 flex items-center space-x-3">
        {data.published && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-stone-400 hover:text-stone-500"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
          {isPendingSaving ? 'Saving...' : 'Saved'}
        </div>
        <button
          onClick={() => {
            const formData = new FormData();
            console.log(data.published, typeof data.published);
            formData.append('published', String(!data.published));
            startTransitionPublishing(async () => {
              await updatePostMetadata(formData, blog.id, 'published').then(
                () => {
                  toast.success(
                    `Successfully ${
                      data.published ? 'unpublished' : 'published'
                    } your post.`
                  );
                  setData((prev) => ({ ...prev, published: !prev.published }));
                }
              );
            });
          }}
          className={cn(
            'flex h-7 w-24 items-center justify-center space-x-2 rounded-lg border text-sm transition-all focus:outline-none',
            isPendingPublishing
              ? 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300'
              : 'border border-black bg-black text-white hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800'
          )}
          disabled={isPendingPublishing}
        >
          {isPendingPublishing ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <p>{data.published ? 'Unpublish' : 'Publish'}</p>
          )}
        </button>
      </div>
      <div className="mb-5 flex flex-col space-y-3 border-b border-stone-200 pb-5 ">
        <input
          type="text"
          placeholder="Title"
          defaultValue={blog?.title || ''}
          
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="dark:placeholder-text-600 border-none px-0 font-cal text-3xl placeholder:text-stone-400 focus:outline-none focus:ring-0 bg-transparent  dark:text-white"
        />
        <TextareaAutosize
          placeholder="Description"
          defaultValue={blog?.description || ''}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          className="dark:placeholder-text-600 w-full resize-none border-none px-0 placeholder:text-stone-400 focus:outline-none focus:ring-0 dark:text-white bg-transparent"
        />
      </div>
      <ScrollArea className="h-[400px]">
        <NovelEditor
          className="relative block "
          defaultValue={blog?.content || ''}
          storageKey={`blog-content-${data.id}`}
          disableLocalStorage
          onUpdate={(editor) => {
            setData((prev) => ({
              ...prev,
              content: editor?.storage.markdown.getMarkdown(),
            }));
          }}
          onDebouncedUpdate={() => {
            if (
              data.title === blog.title &&
              data.description === blog.description &&
              data.content === blog.content
            ) {
              return;
            }
            startTransitionSaving(async () => {
              await updatePost(data);
            });
          }}
        />
      </ScrollArea>
    </div>
  );
}
