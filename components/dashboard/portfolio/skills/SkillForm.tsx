'use client';

import { TypographyLarge } from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateSite } from '@/lib/actions';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function SkillForm({ slug, data }: { slug: string; data: string[] }) {
  const [skills, setSkills] = useState(data);
  const [inputValue, setInputValue] = useState('');

  const handleSkillUpdate = async () => {
    try {
      const formdata = new FormData();
      for (let i in skills) {
        formdata.append('skills', skills[i]);
      }
      updateSite(formdata, slug, 'skills').then((res) => {
        if (res.error) {
          console.log(res.error);
          toast.error(res.error);
        } else {
          toast.success('Skills Updated Successfully');
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAddition(inputValue);
      setInputValue('');
    }
  };

  const handleDelete = (i: number) => {
    setSkills(skills.filter((skill, index) => index !== i));
    toast.success('You have deleted a skill! Save it to apply');
  };

  const handleAddition = (tag: string) => {
    setSkills([...skills, tag]);
    toast.success('You have added a skill! Save it to apply');
  };

  return (
    <div>
      <TypographyLarge>Skills</TypographyLarge>

      <div className="flex flex-wrap gap-4 justify-start items-center mt-10">
        {skills.map((skill: string, index: number) => (
          <div
            key={index}
            className=" border hover:bg-primary/50 px-3 py-2 rounded-xl flex flex-row justify-between gap-4 items-center"
          >
            <p>{skill}</p>
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(index)}
            >
              <PlusCircle className="rotate-45" />
            </span>
          </div>
        ))}
      </div>

      <div className="flex  mt-10 flex-col md:flex-row items-center gap-3">
        <Input
          placeholder="write some skills press enter to apply"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <Button
          variant={'secondary'}
          onClick={handleSkillUpdate}
          disabled={JSON.stringify(skills) === JSON.stringify(data)}
        >
          Save Skills
        </Button>
      </div>
    </div>
  );
}

export default SkillForm;
