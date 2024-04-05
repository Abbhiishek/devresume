'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { JOIN_MAILING_LIST } from '@/lib/contants';
import prisma from '@/lib/db';
import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import { Loader2, MailIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { TypographyH1 } from '../common/Typography';

const formSchema = z.object({
  email: z.string().email(),
});

export default function WaitlistForm() {
  const [sending, setSending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setSending(true);
    try {
      await prisma.newsletter.create({
        data: {
          email: values.email,
        },
      });
      return handleSubmit;
    } catch (error: any) {
      if (error.code === 'P2002') {
        toast('Email is Already in Waiting List');
        return {
          error: "Email is Already in Waiting List",
        };
      } else {
        toast.error(error.title);
        return {
          error: error.message,
        };
      }
    }
  }

  const handleSubmit = async () => {
    let id = setTimeout(() => {
      setSending(false);
      toast.success('You are in the waiting list now 🎉');
      confetti({
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
      clearTimeout(id);
    }, 2000);
  };

  return (
    <main className="flex flex-col min-h-screen min-w-screen font-sans justify-center items-center ">
      <div className="flex gap-2 items-center justify-center">
        <TypographyH1> Ready to join our waitlist? </TypographyH1>
        <MailIcon className="w-10 h-10 text-primary" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
          <div className="flex flex-row justify-center gap-10 items-center">
            <div className="flex flex-col justify-start items-start text-start">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="joe@gmail.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We will notify you when things turn out as we expects
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {sending ? (
                <Button className="w-full flex justify-center gap-4 items-center">
                  <Loader2 className="w-10 h-10 animate-spin" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full flex justify-center gap-4 items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="m197.7 130.9l-52.2-19.3a2 2 0 0 1-1.1-1.1l-19.3-52.2a13.9 13.9 0 0 0-26.2 0l-19.3 52.2a2 2 0 0 1-1.1 1.1l-52.2 19.3a13.9 13.9 0 0 0 0 26.2l52.2 19.3a2 2 0 0 1 1.1 1.1l19.3 52.2a13.9 13.9 0 0 0 26.2 0l19.3-52.2a2 2 0 0 1 1.1-1.1l52.2-19.3a13.9 13.9 0 0 0 0-26.2Zm-4.1 15l-52.2 19.2a13.7 13.7 0 0 0-8.3 8.3l-19.2 52.2a2 2 0 0 1-3.8 0l-19.2-52.2a13.7 13.7 0 0 0-8.3-8.3l-52.2-19.2a2 2 0 0 1 0-3.8l52.2-19.2a13.7 13.7 0 0 0 8.3-8.3l19.2-52.2a2 2 0 0 1 3.8 0l19.2 52.2a13.7 13.7 0 0 0 8.3 8.3l52.2 19.2a2 2 0 0 1 0 3.8ZM146 40a6 6 0 0 1 6-6h18V16a6 6 0 0 1 12 0v18h18a6 6 0 0 1 0 12h-18v18a6 6 0 0 1-12 0V46h-18a6 6 0 0 1-6-6Zm100 48a6 6 0 0 1-6 6h-10v10a6 6 0 0 1-12 0V94h-10a6 6 0 0 1 0-12h10V72a6 6 0 0 1 12 0v10h10a6 6 0 0 1 6 6Z"
                    />
                  </svg>
                  Submit
                </Button>
              )}
            </div>
            <Image src={JOIN_MAILING_LIST} width={400} height={400} alt={''} />
          </div>
        </form>
      </Form>
    </main>
  );
}
