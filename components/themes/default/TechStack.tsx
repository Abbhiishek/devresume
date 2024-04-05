import prisma from '@/lib/db';
import Image from 'next/image';

async function TechStackSection({ siteId }: { siteId: string }) {
  const techstack = await prisma.siteTechStack.findMany({
    where: {
      siteId: siteId,
    },
    select: {
      TechStack: true,
    },
  });

  if (techstack.length === 0) return null;

  return (
    <div id="Skills" className="  my-4 pt-5">
      <h4 className="text-6xl font-light mt-5">Tech I&apos;m Familiar With</h4>
      <div className="flex flex-col gap-5">
        <div className="text-left">
          <div className="relative ">
            <h1 className="absolute text-primary -top-20 left-3 opacity-10 uppercase font-bold lg:text-8xl text-5xl font-title">
              skills
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {techstack.map((tech, index) => (
            <div className="pt-4 md:pb-0 saturate-200 " key={index}>
              <div
                className="flex flex-row items-center justify-start duration-200 
                                    gap-4 transition-all border rounded-2xl px-3 py-2 "
              >
                <Image
                  width={500}
                  height={500}
                  src={tech.TechStack.icon}
                  alt={tech.TechStack.name}
                  className="w-12 h-12 svg-dark"
                />
                <p className="text-center text-sm lg:text-lg font-semibold">
                  {tech.TechStack.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStackSection;
