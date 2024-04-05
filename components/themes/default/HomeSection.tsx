import { TypographyH1 } from '@/components/common/Typography';
import { InstagramLogoIcon } from '@radix-ui/react-icons';
import {
  GithubIcon,
  Globe2Icon,
  LinkedinIcon,
  Twitter,
  YoutubeIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function HomeSection({
  name,
  image,
  tagline,
  twitterid,
  githubid,
  linkedinid,
  websiteurl,
  youtubeurl,
  instagramid,
}: {
  name: string;
  image: string;
  tagline: string;
  twitterid: string;
  githubid: string;
  linkedinid: string;
  youtubeurl: string;
  instagramid: string;
  websiteurl: string;
}) {
  return (
    <div
      className="flex flex-row items-center justify-start lg:justify-around lg:min-h-[700px] min-h-[500px]"
      id="Home"
    >
      <div className="flex flex-col items-start justify-start">
        <TypographyH1 className="font-default lg:text-7xl text-6xl">
          {name}
        </TypographyH1>
        <p className="font-default text-2xl mt-2">{tagline}</p>
        <div className="flex flex-wrap space-x-4 mt-10">
          {twitterid ? (
            <Link href={twitterid} passHref target="_blank">
              <Twitter className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
            </Link>
          ) : null}
          {githubid ? (
            <Link href={githubid} passHref target="_blank">
              <GithubIcon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
            </Link>
          ) : null}
          {linkedinid ? (
            <Link href={linkedinid} passHref target="_blank">
              <LinkedinIcon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
            </Link>
          ) : null}
          {youtubeurl ? (
            <Link href={youtubeurl} passHref target="_blank">
              <YoutubeIcon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
            </Link>
          ) : null}
          {instagramid ? (
            <Link href={instagramid} passHref target="_blank">
              <InstagramLogoIcon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
            </Link>
          ) : null}
          {websiteurl ? (
            <Link href={websiteurl} passHref target="_blank">
              <Globe2Icon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
            </Link>
          ) : null}
        </div>
      </div>
      <div className="hidden lg:flex">
        <Image
          src={image}
          alt={name}
          width={550}
          height={550}
          className="w-96 h-96 rounded-full"
        />
      </div>
      <a
        className="fixed bottom-14 right-8 z-[99] bg-primary cursor-pointer w-[100px] text-center h-12 rounded-full text-lg pt-3"
        href="#Contact"
        rel="noopener"
        aria-label="Contact"
        id="contactbtn"
      >
        <strong>Let&apos;s Talk!</strong>
      </a>
    </div>
  );
}

export default HomeSection;
