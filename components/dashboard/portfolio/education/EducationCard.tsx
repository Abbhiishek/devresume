'use client';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserEducation } from '@prisma/client';

import AddEducationForm from '@/components/form/education-form';
import { Button } from '@/components/ui/button';
import { deleteEducation } from '@/lib/actions';
import { toDateString } from '@/lib/utils';
import va from '@vercel/analytics';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

function EducationCard({ data }: { data: UserEducation }) {
  const router = useRouter();

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{data.school_degree}</CardTitle>
        <CardDescription>
          {data.school_major} - {data.school_name}
          <br />
          {data.school_location}
          <br />
          {toDateString(data.school_start_date!)} -{' '}
          {toDateString(data.school_end_date!)}
          <br />
          <br />
          {data.education_note}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-2">
        <div className="flex flex-warp gap-3">
          <Button
            variant="destructive"
            onClick={async () => {
              deleteEducation(data.id!, 'null', null).then((res) => {
                if (res.error) {
                  console.log(res.error);
                } else {
                  va.track('Deleted educations');
                  router.refresh();
                  toast('Education deleted successfully');
                }
              });
            }}
          >
            Delete
          </Button>
          <AddEducationForm
            title="Edit Education"
            method="edit"
            education={data}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export default EducationCard;
