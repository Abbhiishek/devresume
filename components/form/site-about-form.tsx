'use client';

import { updateAboutSite } from '@/lib/actions';
import { Editor as NovelEditor } from 'novel';
import { useEffect, useState, useTransition } from 'react';
import { ScrollArea } from '../ui/scroll-area';

export default function AboutEditor({
  siteid,
  defaultValue,
  name,
  Title,
  description,
  helpText,
}: {
  siteid: string;
  defaultValue: string;
  name: string;
  Title: string;
  description: string;
  helpText: string;
}) {
  let [isPendingSaving, startTransitionSaving] = useTransition();
  let [isPendingPublishing, startTransitionPublishing] = useTransition();
  const [data, setData] = useState<string>(defaultValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 's') {
        e.preventDefault();
        startTransitionSaving(async () => {
          await updateAboutSite(data, siteid);
        });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [data, siteid, startTransitionSaving]);

  return (
    <div className="relative flex flex-col space-y-4 p-5 sm:p-10 rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black">
      <h2 className="font-title text-xl dark:text-white">{name}</h2>
      <p className="text-sm text-stone-500 dark:text-stone-400">
        {description}
      </p>
      <ScrollArea className="min-h-[300px]">
        <NovelEditor
          className="border-t-2 border-x-2 rounded-lg min-h-[300px]"
          disableLocalStorage
          storageKey="about__portfolio_setting"
          defaultValue={defaultValue || ''}
          onUpdate={(editor) => {
            setData(editor?.storage.markdown.getMarkdown());
          }}
          onDebouncedUpdate={() => {
            if (data === defaultValue) {
              return;
            }
            startTransitionSaving(async () => {
              await updateAboutSite(data, siteid);
            });
          }}
        />
      </ScrollArea>
      <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
        <p className="text-sm text-stone-500 dark:text-stone-400">{helpText}</p>
        <div className="rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-stone-800 dark:text-stone-500">
          {isPendingSaving ? 'Saving...' : 'Saved'}
        </div>
      </div>
    </div>
  );
}
