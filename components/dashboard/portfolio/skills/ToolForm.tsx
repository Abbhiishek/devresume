'use client';

import { TypographyLarge } from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { updateSiteTechStack } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { TechStack } from '@prisma/client';
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

function ToolForm({
  slug,
  data,
  alltechstack,
}: {
  slug: string;
  data: TechStack[];
  alltechstack: TechStack[];
}) {
  const [tools, setTools] = useState(data);
  const [open, setOpen] = useState(false);

  const handleDelete = (i: number) => {
    setTools(tools.filter((tool, index) => index !== i));
    toast.success('You have deleted a tool! Save it to apply');
  };

  const handleToolUpdate = async () => {
    try {
      const formdata = new FormData();
      for (let i in tools) {
        formdata.append('techstack', tools[i].id.toString());
      }
      updateSiteTechStack(formdata, slug, 'key').then((res) => {
        if (res.error) {
          console.log(res.error);
          toast.error(res.error);
        } else {
          toast.success('Tech Stacks Updated Successfully');
        }
      });
      console.log(tools);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-start  mt-10">
      <TypographyLarge>Tech Stacks/ Tools</TypographyLarge>

      <div className="flex flex-wrap gap-4 justify-start items-center mt-10">
        {tools.map((tool: TechStack, index: number) => (
          <div
            key={index}
            className="bg-stone-700 border rounded-md p-2 flex justify-center items-center gap-4"
          >
            <Image src={tool.icon} alt={tool.name} width={30} height={30} />
            <span>{tool.name}</span>
            <span
              className="cursor-pointer"
              onClick={() => handleDelete(index)}
            >
              <PlusCircle className="rotate-45" />
            </span>
          </div>
        ))}

        <hr />

        <div className="flex flex-row justify-between items-center w-full gap-10">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="w-full">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {tools ? 'Select a Tech Stack' : 'No Tech Stack Selected'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-64">
                    {alltechstack.map((techStack) => (
                      <CommandItem
                        key={techStack.id}
                        value={techStack.name.toString()}
                        onSelect={() => {
                          setTools((prev) =>
                            prev.some((tool) => tool.id === techStack.id)
                              ? // remove from array
                                prev.filter((tool) => tool.id !== techStack.id)
                              : [...prev, techStack]
                          );
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            tools.some((tool) => tool.id === techStack.id)
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        <div className="flex flex-row justify-start items-center gap-4">
                          <Image
                            src={techStack.icon}
                            alt={techStack.name}
                            width={30}
                            height={30}
                          />
                          <span>{techStack.name}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            onClick={handleToolUpdate}
            variant={'default'}
            disabled={JSON.stringify(tools) === JSON.stringify(data)}
          >
            Update Tech Stacks
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ToolForm;
