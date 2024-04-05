import WorkExperienceCard from '@/components/dashboard/portfolio/work/WorkExperienceCard';
import WorkExperienceForm from '@/components/form/work-form';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export default async function WorkExperienceSection({
  siteId,
}: {
  siteId: string;
}) {
  const user = auth();
  if (!user.userId) {
    return '/';
  }
  const work = await prisma.userWorkExperience.findMany({
    where: {
      siteId,
      user_id: user.userId as string,
    },
    orderBy: {
      employment_start_date: 'desc',
    },
  });

  return work.length > 0 ? (
    <main className="lg:container w-full space-y-2">
      <div className="flex justify-between w-full py-4">
        <span>Add Work Experience</span>
        <WorkExperienceForm title="Add Work Experience" method="add" />
      </div>
      {work.map((work) => (
        <WorkExperienceCard key={work.id} data={work} />
      ))}
    </main>
  ) : (
    <main className="flex flex-col space-y-4  w-full">
      <p className="text-lg text-stone-500 text-center">
        You do not have any Work Experience yet. Create one to get started.
      </p>
      <WorkExperienceForm title="Add Work Experience" method="add" />
    </main>
  );
}
