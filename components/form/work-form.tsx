'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addWorkExperience, updateWorkExperience } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserWorkExperience } from '@prisma/client';
import { CalendarIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Textarea } from '../ui/textarea';

const CreateWorkExperienceSchema = z.object({
  company_name: z.string({
    required_error: 'Company name is required',
  }),
  employment_position: z.string({
    required_error: 'Company position is required',
  }),
  employment_start_date: z.date({
    required_error: 'Company start date is required',
  }),
  employment_end_date: z
    .date({
      required_error: 'Company end date is required',
    })
    .optional()
    .nullable(),
  description: z.string({
    required_error: 'Company description is required',
  }),
  employment_type: z.string({
    required_error: 'Employment type is required',
  }),
});

export default function WorkExperienceForm({
  title,
  method,
  work,
}: {
  title: string;
  method: 'add' | 'update';
} & (
  | { method: 'add'; work?: never }
  | { method: 'update'; work: UserWorkExperience }
)) {
  const [open, setOpen] = useState(false);
  const { slug } = useParams() as { slug: string };
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateWorkExperienceSchema>>({
    resolver: zodResolver(CreateWorkExperienceSchema),
    defaultValues: work
      ? {
          company_name: work.company_name,
          employment_position: work.employment_position,
          employment_start_date: new Date(work.employment_start_date),
          employment_end_date: work.employment_end_date
            ? new Date(work.employment_end_date)
            : null,
          description: work.descriptions || '', // Fix: Set description to an empty string if it's null or undefined
          employment_type: work.employment_type || '',
        }
      : {
          company_name: '',
          employment_position: '',
          employment_start_date: new Date(),
          employment_end_date: null,
          description: '', // Set description to an empty string
          employment_type: '',
        },
  });

  function onSubmit(values: z.infer<typeof CreateWorkExperienceSchema>) {
    try {
      const formData = new FormData();
      formData.append('company_name', values.company_name);
      formData.append('employment_position', values.employment_position);
      formData.append(
        'employment_start_date',
        values.employment_start_date.toISOString()
      );
      formData.append(
        'employment_end_date',
        values.employment_end_date
          ? values.employment_end_date.toISOString()
          : ''
      );
      formData.append('description', values.description);
      formData.append('employment_type', values.employment_type);
      if (method === 'add') {
        addWorkExperience(formData, 'profile', slug).then(async (res: any) => {
          if (res.error) {
            // toast.error(res.error);
            console.log(res.error);
            toast('An error occurred.');
          } else {
            if (slug) {
              setOpen(false);
              router.refresh();
            } else {
              setOpen(false);
              router.refresh();
            }
            toast('🌱 Successfully added Work Experience!');
          }
        });
      } else if (method === 'update') {
        console.log(work.id);
        updateWorkExperience(work.id, 'null', formData).then(
          async (res: any) => {
            if (res.error) {
              // toast.error(res.error);
              console.log(res.error);
              toast('An error occurred.');
            } else {
              if (slug) {
                setOpen(false);
                router.refresh();
              } else {
                setOpen(false);
                router.refresh();
              }
              toast('🌱 Successfully updated Work Experience!');
            }
          }
        );
      } else {
        toast('method not allowed');
      }
    } catch (error) {
      console.log(error);
      toast('An error occurred.');
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={'default'}>
          {method === 'add' ? 'Add work experience' : 'Edit work experience'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            This will be visible in your Portfolio.
          </AlertDialogDescription>
          <ScrollArea className="h-[350px] ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-1"
              >
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter  Company name" {...field} />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row w-full justify-between items-start gap-4">
                  <FormField
                    control={form.control}
                    name="employment_start_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From</FormLabel>
                        <br />
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-[200px] pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value ? (
                                    <span>
                                      {field.value?.toLocaleDateString()}
                                    </span>
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date: any) => {
                                  field.onChange(new Date(date));
                                }}
                                className="rounded-md border"
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employment_end_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To</FormLabel>
                        <br />
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-[200px] pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {/* RangeError: Invalid time value */}
                                  {field.value ? (
                                    <span>
                                      {field.value?.toLocaleDateString()}
                                    </span>
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                ISOWeek
                                pagedNavigation={false}
                                selected={field.value as Date}
                                footer
                                onSelect={(date: any) => {
                                  field.onChange(new Date(date));
                                }}
                                className="rounded-md border"
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-between items-start gap-4 ">
                  <FormField
                    control={form.control}
                    name="employment_position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Degree" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employment_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Type</FormLabel>
                        <FormControl className="w-full">
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          >
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Choose Employment Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Full Time">
                                Full Time
                              </SelectItem>
                              <SelectItem value="Part Time">
                                Part Time
                              </SelectItem>
                              <SelectItem value="Self Employed">
                                Self Employed
                              </SelectItem>
                              <SelectItem value="Freelance">
                                Freelance
                              </SelectItem>
                              <SelectItem value="Internship">
                                Internship
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your experience at the company"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </ScrollArea>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
          >
            {method === 'add' ? 'Add' : 'Update'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function addEducation(formData: FormData, arg1: string, slug: string) {
  throw new Error('Function not implemented.');
}

function updateEducation(id: any, arg1: string, formData: FormData) {
  throw new Error('Function not implemented.');
}
