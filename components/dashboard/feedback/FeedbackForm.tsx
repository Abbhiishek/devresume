'use client';

import { TypographyMuted } from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@nextui-org/react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  feedback: z.string().min(20, {
    message: 'feedback must be at least 20 characters.',
  }),
});

export default function FeedbackForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await axios
      .post('/api/feedback', values)
      .then((response) => {
        // console.log(response);
        // Handle success
        if (response.status === 200) {
          form.reset();
          toast.success('Feedback Submitted Successfully');
        }
      })
      .catch((error) => {
        console.log(error);
        // Handle error
        toast.error('Something went wrong');
      });
    console.log(values);
  }

  return (
    <Form {...form}>
      <TypographyMuted>
        Your Feedback makes us meet your expectations 🧑‍💻⭐
      </TypographyMuted>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  variant="bordered"
                  disableAnimation
                  disableAutosize
                  classNames={{
                    base: 'max-w-full',
                    input: 'resize-y min-h-[40px]',
                  }}
                  placeholder="write your feedback here ....."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
