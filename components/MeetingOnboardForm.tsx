'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TablesInsert } from '@/lib/database.types';

interface OnboardFormValues {
  name: string;
  role: string;
  email: string;
  day: string;
  time: string;
  frequency: string;
  user_id: number; // Added user_id field to match TablesInsert<'meetings'> type
}

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  day: z.string().min(1, { message: 'Day is required' }),
  time: z.string().min(1, { message: 'Time is required' }),
  frequency: z.string().min(1, { message: 'Frequency is required' }),
  user_id: z.number().positive().optional(), // Added user_id field with optional positive number type
});

interface MeetingOnboardFormProps {
  onSubmit: () => Promise<void>;
  onAddMeeting: (data: TablesInsert<'meetings'>) => void;
}

export default function MeetingOnboardForm({ onSubmit, onAddMeeting }: MeetingOnboardFormProps) {
  const form = useForm<TablesInsert<'meetings'>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      role: '',
      email: '',
      day: '',
      time: '',
      frequency: '',
      user_id: 0, // Initialize user_id to 0
    },
  });

  const handleAddMeeting = (data: TablesInsert<'meetings'>) => {
    onAddMeeting(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddMeeting)} className="space-y-4">
        <div className="flex space-x-4">
          <FormItem className="w-7/12">
            <FormLabel className="text-text-primary">Name</FormLabel>
            <FormControl>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => <Input placeholder="Enter name" {...field} value={field.value ?? ''} />}
              />
            </FormControl>
            <FormDescription>Your name</FormDescription>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel className="text-text-primary">Role</FormLabel>
            <FormControl>
              <Controller
                name="role"
                control={form.control}
                render={({ field }) => <Input placeholder="Enter role" {...field} value={field.value ?? ''} />}
              />
            </FormControl>
            <FormDescription>Your role</FormDescription>
            <FormMessage />
          </FormItem>
        </div>

        <FormItem>
          <FormLabel className="text-text-primary">Email</FormLabel>
          <FormControl>
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => <Input placeholder="Enter email" {...field} value={field.value ?? ''} />}
            />
          </FormControl>
          <FormDescription>Your email address</FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel className="text-text-primary">Day</FormLabel>
          <FormControl>
            <Controller
              name="day"
              control={form.control}
              render={({ field }) => <Input placeholder="Enter day" {...field} value={field.value ?? ''} />}
            />
          </FormControl>
          <FormDescription>Meeting day</FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel className="text-text-primary">Time</FormLabel>
          <FormControl>
            <Controller
              name="time"
              control={form.control}
              render={({ field }) => <Input placeholder="Enter time" {...field} value={field.value ?? ''} />}
            />
          </FormControl>
          <FormDescription>Meeting time</FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel className="text-text-primary">Frequency</FormLabel>
          <FormControl>
            <Controller
              name="frequency"
              control={form.control}
              render={({ field }) => <Input placeholder="Enter frequency" {...field} value={field.value ?? ''} />}
            />
          </FormControl>
          <FormDescription>Meeting frequency</FormDescription>
          <FormMessage />
        </FormItem>

        <Button type="submit" variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary">
          Add Meeting
        </Button>
      </form>
      <Button onClick={onSubmit} variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary mt-4">
        Submit All
      </Button>
    </Form>
  );
}