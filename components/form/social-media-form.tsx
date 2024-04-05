'use client';

import { updateSite } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import {
  GitHubLogoIcon,
  GlobeIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { Loader2, YoutubeIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { TypographyP } from '../common/Typography';

export default function SocialMediaForm({
  socials,
}: {
  socials: {
    twitterid: string;
    linkedinid: string;
    githubid: string;
    websiteurl: string;
    instagramid: string;
    youtubeurl: string;
  };
}) {
  const { slug } = useParams() as { slug: string };
  return (
    <form
      action={async (data: FormData) =>
        updateSite(data, slug, 'socials')
          .then(async (res) => {
            if (res.error) {
              toast.error('An error occurred. Please try again later.');
            } else {
              toast.success('Social Media Links Updated Successfully.');
            }
          })
          .catch((err: Error) => {
            toast.error('An error occurred. Please try again later.');
          })
      }
      className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
    >
      <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
        <div className="flex flex-wrap gap-4 justify-between">
          <div className=" flex flex-col w-full max-w-md space-y-2">
            <div className="flex items-center justify-start gap-2">
              <InstagramLogoIcon className="w-6 h-6" />{' '}
              <TypographyP>Instagram Profile</TypographyP>
            </div>
            <Input
              name="instagramid"
              defaultValue={socials.instagramid}
              required
              placeholder="https://www.instagram.com/abbhishek.kushwaha/"
              className="z-10 flex-1 rounded-l-md  text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          </div>
          <div className=" flex flex-col w-full max-w-md space-y-2">
            <div className="flex items-center justify-start gap-2">
              <GitHubLogoIcon className="w-6 h-6" />{' '}
              <TypographyP>Github Profile</TypographyP>
            </div>
            <Input
              name="githubid"
              defaultValue={socials.githubid}
              required
              placeholder="https://github.com/Abbhiishek"
              className="z-10 flex-1 rounded-l-md  text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          </div>
          <div className=" flex flex-col w-full max-w-md space-y-2">
            <div className="flex items-center justify-start gap-2">
              <LinkedInLogoIcon className="w-6 h-6" />{' '}
              <TypographyP>LinkedIn Profile</TypographyP>
            </div>
            <Input
              name="linkedinid"
              defaultValue={socials.linkedinid}
              required
              placeholder="https://www.linkedin.com/in/abbhiishek/"
              className="z-10 flex-1 rounded-l-md  text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          </div>
          <div className=" flex flex-col w-full max-w-md space-y-2">
            <div className="flex items-center justify-start gap-2">
              <TwitterLogoIcon className="w-6 h-6" />{' '}
              <TypographyP>Twitter Profile</TypographyP>
            </div>
            <Input
              name="twitterid"
              defaultValue={socials.twitterid}
              required
              placeholder="https://twitter.com/abbhishekstwt"
              className="z-10 flex-1 rounded-l-md  text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          </div>
          <div className=" flex flex-col w-full max-w-md space-y-2">
            <div className="flex items-center justify-start gap-2">
              <YoutubeIcon className="w-6 h-6" />{' '}
              <TypographyP>Youtube Profile</TypographyP>
            </div>
            <Input
              name="youtubeurl"
              defaultValue={socials.youtubeurl}
              required
              placeholder="https://www.youtube.com/@AbhishekKushwaha."
              className="z-10 flex-1 rounded-l-md  text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          </div>
          <div className=" flex flex-col w-full max-w-md space-y-2">
            <div className="flex items-center justify-start gap-2">
              <GlobeIcon className="w-6 h-6" />{' '}
              <TypographyP> Your website</TypographyP>
            </div>
            <Input
              name="websiteurl"
              defaultValue={socials.websiteurl}
              required
              placeholder="https://abhishekkushwaha.dresume.me/"
              className="z-10 flex-1 rounded-l-md  text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
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
          : 'border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800'
      )}
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        <p>Save Changes</p>
      )}
    </button>
  );
}
