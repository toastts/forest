'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface OnboardFormValues {
  name: string;
  role: string;
  email: string;
  day: string;
  time: string;
  frequency: string;
}

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  day: z.string().min(1, { message: 'Day is required' }),
  time: z.string().min(1, { message: 'Time is required' }),
  frequency: z.string().min(1, { message: 'Frequency is required' }),
});

export default function UserOnboardForm() {
  const [formData, setFormData] = useState<OnboardFormValues[]>([]);
  const form = useForm<OnboardFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      role: '',
      email: '',
      day: '',
      time: '',
      frequency: '',
    },
  });

  const onSubmit = async (data: OnboardFormValues) => {
    const newFormData = [...formData, data];
    setFormData(newFormData);
    console.log('Form data:', data);
    console.log('All form data:', newFormData);
  };

  return (
    <Card className="w-[600px] bg-background-primary p-8">
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
          <Button type="submit" variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary">
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}
