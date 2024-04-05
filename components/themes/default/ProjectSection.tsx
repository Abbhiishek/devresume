import { TypographyH2, TypographyP } from '@/components/common/Typography';
import { Projects } from '@prisma/client';
import { GlobeIcon } from '@radix-ui/react-icons';
import { GithubIcon } from 'lucide-react';
import Link from 'next/link';

function ProjectSection({ projects }: { projects: Projects[] }) {
  if (projects.length === 0) return null;
  return (
    <>
      <section className="my-4 pt-5" id="Projects">
        <h4 className="text-6xl font-light mt-5">Projects</h4>
        <div className="text-left relative">
          <h1 className="absolute -top-16 left-3 opacity-10 text-primary uppercase font-bold lg:text-8xl text-5xl font-title ">
            OPEN SOURCE
          </h1>
        </div>
        <div>
          {projects.map((project, index) => (
            <div className="pt-10" key={index}>
              <div className="desc ">
                <TypographyH2>{project.name}</TypographyH2>
                <TypographyP>
                  <span className="text-primary">{project.oneliner}</span>
                </TypographyP>
                <div className="flex flex-wrap justify-start items-center gap-3 py-2">
                  <span>Skills Acquired</span>
                  <div className="space-x-1 flex">
                    {project.skills.map((skill, index) => (
                      <TypographyP key={index}>
                        <span className="text-primary">{skill},</span>
                      </TypographyP>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center gap-2 mt-4">
                  {project.repourl && (
                    <Link
                      href={project.repourl}
                      passHref
                      target="_blank"
                      className="w-10 h-10 hover:text-primary hover:-translate-y-2 transition-all ease-linear duration-250"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </Link>
                  )}
                  {project.url && (
                    <Link
                      href={project.url}
                      passHref
                      target="_blank"
                      className="w-10 h-10 hover:text-primary hover:-translate-y-2 transition-all ease-linear duration-250"
                    >
                      <GlobeIcon className="w-5 h-5" />
                    </Link>
                  )}
                </div>
                <div className="flex">
                  <TypographyP className="mt-4  lg:basis-1/2">
                    {project.description}
                  </TypographyP>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProjectSection;
