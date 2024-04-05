'use client';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

const people = [
  {
    id: 1,
    name: 'AbhisheK Kushwaha',
    designation: 'Full Stack Developer',
    image: 'https://avatars.githubusercontent.com/u/86338762?v=4',
  },
  {
    id: 2,
    name: 'Shemanti Pal',
    designation: 'Designer @DevResume',
    image: 'https://avatars.githubusercontent.com/u/116779027?v=4',
  },
];

function BuildByDevelopers() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}

export default BuildByDevelopers;
