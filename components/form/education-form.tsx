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
import { addEducation, updateEducation } from '@/lib/actions';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserEducation } from '@prisma/client';
import { CalendarIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Textarea } from '../ui/textarea';

const CreateEducationSchema = z.object({
  school_name: z.string({
    description: 'Name is required',
    required_error: 'Name is required',
    invalid_type_error: 'Name is must be string',
  }),
  school_location: z.string({
    description: 'Location is required',
    required_error: 'Location is required',
    invalid_type_error: 'Location is must be string',
  }),
  school_degree: z.string(),
  school_major: z.string(),
  school_start_date: z.date({
    description: 'Start Date is required',
  }),
  school_end_date: z.date({
    description: 'End Date is required',
  }),
  education_note: z
    .string({
      description: 'Note is required',
    })
    .max(225, {
      message: 'Note must be at most 225 characters long',
    }),
});

export default function AddEducationForm({
  title,
  method,
  education,
}: {
  title: string;
  method: 'add' | 'edit';
} & (
  | { method: 'add'; education?: never }
  | {
      method: 'edit';
      education: UserEducation;
    }
)) {
  const [open, setOpen] = useState(false);
  const { slug } = useParams() as { slug: string };
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateEducationSchema>>({
    resolver: zodResolver(CreateEducationSchema),
    defaultValues: education
      ? {
          school_name: education.school_name,
          school_location: education.school_location || '',
          school_degree: education.school_degree || '',
          school_major: education.school_major || '',
          school_start_date: education.school_start_date || new Date(),
          school_end_date: education.school_end_date || new Date(),
          education_note: education.education_note || '',
        }
      : {
          school_start_date: new Date(),
          school_end_date: new Date(),
        },
  });

  function onSubmit(values: z.infer<typeof CreateEducationSchema>) {
    if (form.formState.isValid) {
      try {
        const formData = new FormData();
        formData.append('school_name', values.school_name);
        formData.append('school_location', values.school_location);
        formData.append('school_degree', values.school_degree);
        formData.append('school_major', values.school_major);
        formData.append(
          'school_start_date',
          values.school_start_date.toISOString()
        );
        formData.append(
          'school_end_date',
          values.school_end_date.toISOString()
        );
        formData.append('education_note', values.education_note);

        if (method === 'add') {
          addEducation(formData, 'profile', slug).then(async (res: any) => {
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
              toast('🌱 Successfully added Education!');
            }
          });
        } else if (method === 'edit') {
          console.log(education.id);
          updateEducation(education.id, 'null', formData).then(
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
                toast('🌱 Successfully updated Education!');
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
    } else {
      toast('Kindly fill the form correctly.');
    }
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant={'default'}>
            {method === 'add' ? 'Add Education' : 'Edit'}
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
                    name="school_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institute name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Institute name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row w-full justify-between items-center gap-4">
                    <FormField
                      control={form.control}
                      name="school_start_date"
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
                      name="school_end_date"
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
                  </div>
                  <FormField
                    control={form.control}
                    name="school_degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Degree" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="school_major"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex. Computer Science"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="school_location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institute Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Patna, Bihar, India" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="education_note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Write something about your education"
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
    </>
  );
}
