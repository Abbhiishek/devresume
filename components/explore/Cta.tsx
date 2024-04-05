import { Spotlight } from '@/components/ui/Spotlight';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function CallToActionPreview() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          DevResume <br /> is the new way to Share.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          With DevResume, you can create a beautiful and professional resume
          website in minutes. Share your work, your skills, and your knowledge
          with the world. Discover and connect with professionals in your
          industry, all in one place.
        </p>
        <div className="flex justify-center items-center mt-5">
          <Link href={'/dashboard'}>
            <Button className="" variant={'outline'}>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
