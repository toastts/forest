'use client';

import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { useSetupFormContext } from '@/components/fds/forms/SetupFormContext';
import { handleMeetingOnboardFormSubmit } from '@/app/setup/actions';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

enum Day {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

enum Frequency {
  Daily = 'Daily',
  Weekly = 'Weekly',
  Biweekly = 'Biweekly',
  Monthly = 'Monthly'

}

export const MeetingOnboardFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  day: z.nativeEnum(Day),
  //kinda jank way to validate a time string but input=time sorta guarantees type safety
  time: z.string().transform((val) => val + ':00'),
  frequency: z.nativeEnum(Frequency),
});

export type MeetingOnboardFormValues = z.infer<typeof MeetingOnboardFormSchema>;



export const MeetingOnboardForm = () => {
  const form = useForm<MeetingOnboardFormValues>({
    resolver: zodResolver(MeetingOnboardFormSchema),
    defaultValues: {
      name: '',
      role: '',
      email: '',
      day: Day.Monday,
      time: '',
      frequency: Frequency.Weekly,
    },
  });
  const { meetings, setMeetings } = useSetupFormContext();

  const handleSubmit = async () => {
    await handleMeetingOnboardFormSubmit(meetings);
  };

  const handleAddMeeting = () => {
    setMeetings((prev) => [])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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

        <Button type="button" onClick={handleAddMeeting} variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary">
          Add Meeting
        </Button>
        <Button type="submit" variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}
