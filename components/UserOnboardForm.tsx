'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { TablesInsert } from '@/lib/database.types';

interface OnboardFormValues {
  name: string;
  role: string;
  email: string;
  prompt: string;
}

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  prompt: z.string().min(1, { message: 'Prompt is required' }).optional(),
});

interface UserOnboardFormProps {
  onSubmit: (data: TablesInsert<'users'>) => void;
}

export default function UserOnboardForm({ onSubmit }: UserOnboardFormProps) {
  const form = useForm<TablesInsert<'users'>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      role: '',
      email: '',
      prompt: '',
    },
  });

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex space-x-4">
            <FormItem className="w-7/12">
              <FormLabel className="text-text-primary">Name</FormLabel>
              <FormControl>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => <Input placeholder="Enter name" {...field} />}
                />
              </FormControl>
              <FormDescription>Your team member's name</FormDescription>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel className="text-text-primary">Role</FormLabel>
              <FormControl>
                <Controller
                  name="role"
                  control={form.control}
                  render={({ field }) => <Input placeholder="Enter role" {...field} />}
                />
              </FormControl>
              <FormDescription>Your team member's role</FormDescription>
              <FormMessage />
            </FormItem>
          </div>

          <FormItem>
            <FormLabel className="text-text-primary">Email</FormLabel>
            <FormControl>
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => <Input placeholder="Enter email" {...field} />}
              />
            </FormControl>
            <FormDescription>Your team member's email address</FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel className="text-text-primary">How can Forest help you improve your 1:1s?</FormLabel>
            <FormControl>
              <Controller
                name="prompt"
                control={form.control}
                render={({ field }) => <Textarea placeholder="Enter your response" {...field} value={field.value ?? ''} />}
              />
            </FormControl>
            <FormDescription>Share your thoughts on how we can assist you</FormDescription>
            <FormMessage />
          </FormItem>
          <Button type="submit" variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary">
            Submit
          </Button>
        </form>
      </Form>
  );
}