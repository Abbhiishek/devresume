import SkillForm from '@/components/dashboard/portfolio/skills/SkillForm';
import ToolForm from '@/components/dashboard/portfolio/skills/ToolForm';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export default async function SkillsToolsSection({
  siteId,
}: {
  siteId: string;
}) {
  const user = auth();
  if (!user.userId) {
    return '/';
  }

  const masterdata = await Promise.all([
    await prisma.site.findFirst({
      where: {
        id: siteId,
      },
      select: {
        skills: true,
        siteTechStack: true,
      },
    }),
    prisma.techStack.findMany({
      where: {
        siteTechStack: {
          some: {
            siteId: siteId,
          },
        },
      },
    }),
    await prisma.techStack.findMany(),
  ]);
  // const Siteskills = await prisma.site.findFirst({
  //     where: {
  //         id: siteId
  //     },
  //     select: {
  //         skills: true,
  //         siteTechStack: true
  //     }
  // })
  // const techstack = await prisma.techStack.findMany({
  //     where: {
  //         siteTechStack: {
  //             some: {
  //                 siteId: siteId
  //             }
  //         }
  //     }
  // })

  // const alltechstack = await prisma.techStack.findMany();

  return (
    <div className="flex flex-col">
      <SkillForm slug={siteId} data={masterdata[0]?.skills!} />
      <ToolForm
        slug={siteId}
        data={masterdata[1]}
        alltechstack={masterdata[2]}
      />
    </div>
  );
}
