import {
  TypographyH4,
  TypographyMuted,
  TypographyP,
} from '@/components/common/Typography';
import { toDateString } from '@/lib/utils';
import { UserEducation } from '@prisma/client';

function EducationSection({ education }: { education: UserEducation[] }) {
  if (education.length === 0) return null;

  return (
    <section className="  my-4 pt-5" id="Education">
      <h4 className="text-6xl font-light mt-5">Education</h4>
      <div className="text-left relative">
        <h1
          className="absolute -top-16 left-3 opacity-10 
                    uppercase font-bold lg:text-8xl text-5xl font-title -rotate-1 text-primary"
        >
          Academics
        </h1>
      </div>
      <div>
        {education.length > 0 &&
          education.map((edu, index) => (
            <div className="pt-10" key={index}>
              <div className="desc ">
                <TypographyH4>
                  {edu.school_degree} in {edu.school_major}
                </TypographyH4>
                <TypographyP>
                  <span className="text-primary">{edu.school_name}</span>,{' '}
                  {edu.school_location}
                </TypographyP>
                <TypographyMuted>
                  {toDateString(edu.school_start_date!)} -{' '}
                  {toDateString(edu.school_end_date!)}
                </TypographyMuted>
                <TypographyP className="mt-4 pl-2">
                  {edu.education_note}
                </TypographyP>
              </div>
            </div>
          ))}
        {/* <div className="pt-10">
                    <div className="desc ">
                        <TypographyH4>Bachelor&apos;s Degree in Computer Science & Engineering</TypographyH4>
                        <TypographyP>
                            <span className="text-primary">JIS University</span>, West Bengal
                        </TypographyP>
                        <TypographyMuted>2020 - 2025</TypographyMuted>
                        <TypographyP className="mt-4 pl-2">
                            Hey
                        </TypographyP>
                    </div>
                </div> */}
      </div>
    </section>
  );
}

export default EducationSection;
