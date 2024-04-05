'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  firstname: z.string().min(4, {
    message: 'first name must be at least 4 characters.',
  }),
  lastname: z.string().min(4, {
    message: 'last name must be at least 4 characters.',
  }),
  bio: z.string().optional(),
  profession: z.string().nullable().optional(),
  twitter: z
    .string()
    .url(
      'Please enter a valid twitter url. Example: https://twitter.com/username'
    )
    .optional()
    .or(z.literal('')),
  linkedin: z
    .string()
    .url(
      'Please enter a valid linkedin url. Example: https://linkedin.com/in/username'
    )
    .optional()
    .or(z.literal('')),
  github: z
    .string()
    .url(
      'Please enter a valid github url. Example: https://github.com/username'
    )
    .optional()
    .or(z.literal('')),
  website: z
    .string()
    .url('Please enter a valid website url. Example: https://example.com')
    .optional()
    .or(z.literal('')),
});

export default function EditProfile({
  user,
  action,
}: {
  user: User;
  action: any;
}) {
  const [firstname, setFirstName] = useState<string>(user.firstname || '');
  const [lastname, setLastName] = useState<string>(user.lastname || '');
  const [bio, setBio] = useState<string>(user.bio || '');
  const [twitter, setTwitter] = useState<string>(user.twitterid || '');
  const [github, setGithub] = useState<string>(user.githubid || '');
  const [linkedin, setLinkedin] = useState<string>(user.linkedinid || '');
  const [website, setWebsite] = useState<string>(user.websiteurl || '');
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      firstname,
      lastname,
      bio,
      twitter,
      github,
      linkedin,
      website,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // action(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
