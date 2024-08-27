'use client';

import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { useSetupFormContext } from '@/components/forms/SetupFormContext';
import { submitMeetingOnboardAction } from '@/app/setup/actions';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MeetingOnboardFormSchema, Day, Frequency } from './FormSchemas';


export const MeetingOnboardForm = () => {
  const form = useForm<z.output<typeof MeetingOnboardFormSchema>>({
    resolver: zodResolver(MeetingOnboardFormSchema),
    defaultValues: {
      name: '',
      role: '',
      email: '',
      day: 'monday',
      time: '',
      frequency: 'weekly',
    },
  });

  const { meetings, setMeetings } = useSetupFormContext();

  const handleSubmit = async () => {
    await submitMeetingOnboardAction(meetings);
  };

  // pushes the meeting to the context
  const handleAddMeeting = (data: any) => {
    console.log(data)
    setMeetings((prev) => [...prev, data])
    form.reset()
  }

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
              render={({ field }) => <Input placeholder="Enter time" type="time" {...field} value={field.value ?? ''} />}
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


        {/*NOTE: adds are submits but the actual submit is handled by onclick to reduce rerenders*/}
        <Button type="submit" variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary mt-4">
          add
        </Button>
        <Button type="button" onClick={handleSubmit} variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary">
          submit
        </Button>
      </form>
    </Form>
  );
}
