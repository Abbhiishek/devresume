import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import {
  APP_CORE_DEVELOPER,
  APP_DASHBOARD_LINK,
  APP_DESC,
  APP_GITHUB_REPO_LINK,
  APP_NAME,
} from '@/lib/contants';
import { Button } from '@nextui-org/react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { TypewriterEffect } from '../ui/typewriter-effect';

function LandingSection() {
  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        <div className="lg:container py-32 mx-auto sm:py-48 min-h-screen">
          <div className="text-center">
            <p className="mt-6 text-lg leading-8 font-cal">{APP_DESC}</p>
            <TypewriterEffect
              words={[
                {
                  text: APP_NAME,
                  className:
                    'text-4xl font-bold font-cal  sm:text-9xl text-primary dark:text-primary',
                },
              ]}
              cursorClassName="bg-primary"
            />
            <Link
              className="flex justify-center items-center mt-10"
              href="https://www.producthunt.com/posts/dev-resume?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-dev&#0045;resume"
              target="_blank"
            >
              <Image
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=439561&theme=light"
                alt="Dev&#0032;Resume - Craft&#0032;your&#0032;standout&#0032;developer&#0032;profile&#0032;with&#0032;DevResume&#0032; | Product Hunt"
                width={250}
                height={54}

                // style="width: 250px; height: 54px;" width="250" height="54"
              />
            </Link>
            <div className="mt-10 flex flex-row justify-center items-center gap-10 ">
              <Link href={APP_DASHBOARD_LINK} passHref>
                <Button
                  size="lg"
                  color="success"
                  variant="shadow"
                  className="bg-gradient-to-tr from-green-300 to-green-600 text-white shadow-2xl"
                >
                  Get Started
                </Button>
              </Link>
              <Link href={APP_GITHUB_REPO_LINK} passHref>
                <Button
                  size="lg"
                  radius="full"
                  color="success"
                  variant="ghost"
                  startContent={<GitHubLogoIcon className="w-5 h-5" />}
                >
                  Github
                </Button>
              </Link>
            </div>
            <span className="text-sm ">Proudly brought to you by </span>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
              <AnimatedTooltip items={APP_CORE_DEVELOPER} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingSection;
