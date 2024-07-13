'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';

interface OnboardFormValues {
  email: string;
  name: string;
  role: string;
  time: Date;
  frequency: string;
}

export default function OnboardPage() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get('state');
  const initialState = stateParam ? JSON.parse(decodeURIComponent(stateParam)) : {};
  const [formData, setFormData] = useState<OnboardFormValues[]>([]);
  const form = useForm<OnboardFormValues>();

  const onSubmit = (data: OnboardFormValues) => {
    setFormData([...formData, data]);
    console.log('Form data:', data);
    console.log('All form data:', formData);
  };

  return (
    <div className="bg-background-primary min-h-screen flex flex-col items-center justify-center space-y-[60px]">
      <div className="text-white text-center">
        <p>Now lets set up your 1:1s for each of your team members.</p>
        <p>Connect your Google Calendar to add them automatically or set them up one by one below.</p>
      </div>

      <Card className="w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormItem>
              <FormLabel>Email</FormLabel>
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
              <FormLabel>Name</FormLabel>
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
              <FormLabel>Role</FormLabel>
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

            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Controller
                  name="time"
                  control={form.control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">{field.value ? field.value.toLocaleString() : 'Pick a date and time'}</Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar selected={field.value} onSelect={field.onChange} />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </FormControl>
              <FormDescription>The date and time for the 1:1 meeting</FormDescription>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Meeting Frequency</FormLabel>
              <FormControl>
                <Controller
                  name="frequency"
                  control={form.control}
                  render={({ field }) => <Input placeholder="Enter meeting frequency" {...field} />}
                />
              </FormControl>
              <FormDescription>The frequency of the 1:1 meetings (e.g., weekly, bi-weekly)</FormDescription>
              <FormMessage />
            </FormItem>

            <Button type="submit" variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}