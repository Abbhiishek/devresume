'use client';

import { TypographyH2 } from '@/components/common/Typography';
import MDX from '@/components/mdx';

function AboutSection({
  skills,
  mdxabout,
}: {
  skills: string[];
  mdxabout: any;
}) {
  // console.log(mdxabout)

  return (
    <div id="About" className="min-h-[500px]  my-4 pt-5">
      <h4 className="text-6xl font-light mt-5">About</h4>
      <div className="flex lg:flex-row flex-col gap-5">
        <div className="lg:basis-1/2  text-left">
          <div className="relative ">
            <h1 className="absolute -top-20 left-3 text-primary opacity-10 uppercase font-bold  lg:text-8xl text-6xl font-title">
              About
            </h1>
            <div className="pt-5">
              <MDX source={mdxabout || 'hey'} />
            </div>
          </div>
        </div>
        <div className="lg:basis-1/2   pl-5">
          <div className="flex flex-col mt-5">
            <div className="md:basis-8/12">
              <TypographyH2 className="mb-4 pb-2">Skill Stacks</TypographyH2>
            </div>
            {skills?.slice(0, 5).map((skill, index) => (
              <div className="md:basis-6/12 mt-3" key={index}>
                <h4 className="font-semibold text-2xl">{skill}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
