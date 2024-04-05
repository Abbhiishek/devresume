'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserWorkExperience } from '@prisma/client';

import WorkExperienceForm from '@/components/form/work-form';
import { Button } from '@/components/ui/button';
import { deleteWorkExperience } from '@/lib/actions';
import { getDuration, toDateString } from '@/lib/utils';
import va from '@vercel/analytics';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function WorkExperienceCard({ data }: { data: UserWorkExperience }) {
  const router = useRouter();
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>
          {data.company_name}{' '}
          <span className="text-sm opacity-25">
            {' '}
            (
            {getDuration(
              data.employment_start_date,
              data.employment_end_date!,
              data.still_working
            )}
            ){' '}
          </span>
        </CardTitle>
        <CardDescription>
          {data.employment_position} - {data.employment_type}
          <br />
          {data.company_location}
          <br />
          {toDateString(data.employment_start_date!)} -{' '}
          {data.employment_end_date
            ? toDateString(data.employment_end_date)
            : 'Present'}
          <br />
          <br />
          {data.descriptions}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex flex-warp gap-3">
          <Button
            variant="destructive"
            onClick={async () => {
              deleteWorkExperience(data.id!, 'null', null).then((res: any) => {
                if (res.error) {
                  console.log(res.error);
                } else {
                  va.track('Deleted work experience');
                  router.refresh();
                  toast('Education deleted successfully');
                }
              });
            }}
          >
            Delete
          </Button>
          <WorkExperienceForm
            title="Edit Education"
            method="update"
            work={data}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export default WorkExperienceCard;
