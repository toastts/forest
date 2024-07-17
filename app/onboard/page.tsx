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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dummyUserOnboardData } from '@/lib/constants';

interface OnboardFormValues {
  email: string;
  name: string;
  role: string;
  time: Date | null;
  frequency: string;
}

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  name: z.string().min(1, { message: 'Name is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  time: z.date({ required_error: 'A date and time is required.' }).nullable(),
  frequency: z.string().min(1, { message: 'Frequency is required' }),
});

export default function OnboardPage() {
  const searchParams = useSearchParams();
  const stateParam = searchParams?.get('state');
  const initialState = stateParam ? JSON.parse(decodeURIComponent(stateParam)) : {};
  const [formData, setFormData] = useState<OnboardFormValues[]>([]);
  const form = useForm<OnboardFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      name: '',
      role: '',
      time: null,
      frequency: '',
    },
  });

  const onSubmit = async (data: OnboardFormValues) => {
    const newFormData = [...formData, data];
    setFormData(newFormData);
    console.log('Form data:', data);
    console.log('All form data:', newFormData);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dummyUserOnboardData }),
      });

      if (!response.ok) {
        throw new Error('Failed to send data to API');
      }

      const result = await response.json();
      console.log('Response from GPT:', result);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="bg-background-primary min-h-screen flex flex-col items-center justify-center space-y-[60px]">
      <div className="text-white text-center">
        <p>Now lets set up your 1:1s for each of your team members.</p>
        <p>Connect your Google Calendar to add them automatically or set them up one by one below.</p>
      </div>

      <Card className="w-[600px] bg-background-primary p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <FormItem>
              <FormLabel className="text-text-primary">Time</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !form.watch("time") && "text-muted-foreground"
                      )}
                    >
                      {form.watch("time") ? (
                        format(form.watch("time") as Date, "PPP p")
                      ) : (
                        <span>Pick a date and time</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.watch("time") || new Date()}
                    onSelect={(date) => form.setValue("time", date || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>The date and time for the 1:1 meeting</FormDescription>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel className="text-text-primary">Meeting Frequency</FormLabel>
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

