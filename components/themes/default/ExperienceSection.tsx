import {
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from '@/components/common/Typography';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { toDateString } from '@/lib/utils';
import { UserWorkExperience } from '@prisma/client';

function ExperienceSection({
  workexperience,
}: {
  workexperience: UserWorkExperience[];
}) {
  if (workexperience.length === 0) return null;

  return (
    <section className="  my-4 pt-5" id="Experience">
      <h4 className="text-6xl font-light mt-5">Experience</h4>
      <div className="text-left relative">
        <h1
          className="absolute -top-16 left-3 opacity-10 uppercase 
                    font-bold lg:text-8xl text-5xl font-title text-primary"
        >
          profile
        </h1>
      </div>
      <div>
        {workexperience.length > 0 &&
          workexperience.map((work, index) => (
            <div className="pt-10" key={index}>
              <div className="desc ">
                <TypographyH4>
                  <span className="text-primary">
                    {work.employment_position}
                  </span>
                </TypographyH4>
                <TypographyH3>{work.company_name}</TypographyH3>
                <TypographyP>
                  <span className="text-primary">{work.company_location}</span>
                </TypographyP>
                <TypographyMuted>
                  {toDateString(work.employment_start_date!)} -
                  {work.still_working ? (
                    <span className="pl-1">Present</span>
                  ) : (
                    work.employment_end_date &&
                    toDateString(work.employment_end_date)
                  )}
                </TypographyMuted>
                <TextGenerateEffect
                  words={work.descriptions || ''}
                  className="mt-4 text-sm pl-2 w-[75%] text-balance  opacity-75"
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
