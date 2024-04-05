import EducationCard from '@/components/dashboard/portfolio/education/EducationCard';
import AddEducationForm from '@/components/form/education-form';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

async function EducationSection({ siteId }: { siteId: string }) {
  const user = auth();
  if (!user.userId) {
    return '/';
  }
  const education = await prisma.userEducation.findMany({
    where: {
      user_id: user.userId as string,
      siteId,
    },
    orderBy: {
      school_end_date: 'desc',
    },
  });

  return education.length > 0 ? (
    <main className="lg:container w-full space-y-2">
      <div className="flex justify-between w-full py-4">
        <span>Add Education</span>
        <AddEducationForm title="Add Education" method="add" />
      </div>
      {education.map((education) => (
        <EducationCard key={education.id} data={education} />
      ))}
      <Separator />
    </main>
  ) : (
    <main className="flex flex-col space-y-4  w-full">
      <p className="text-lg text-stone-500 text-center">
        You do not have any Education yet. Create one to get started.
      </p>
      <AddEducationForm title="Add Education" method="add" />
    </main>
  );
}

export default EducationSection;
