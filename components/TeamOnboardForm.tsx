'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface TeamOnboardFormProps {
  onSubmit: (data: OnboardFormValues) => void;
  onAddMember: (data: OnboardFormValues) => void;
}

export default function TeamOnboardForm({ onSubmit, onAddMember }: TeamOnboardFormProps) {
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

  const handleAddMember = (data: OnboardFormValues) => {
    onAddMember(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAddMember)} className="space-y-4">
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

        <div className="flex space-x-4">
          <FormItem className="w-5/12">
            <FormLabel className="text-text-primary">Meeting Day</FormLabel>
            <FormControl>
              <Controller
                name="day"
                control={form.control}
                render={({ field }) => (
                  <ToggleGroup type="single" onValueChange={field.onChange} value={field.value}>
                    <ToggleGroupItem value="Sunday" aria-label="Meeting day: Sunday">
                      <span>S</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Monday" aria-label="Meeting day: Monday">
                      <span>M</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Tuesday" aria-label="Meeting day: Tuesday">
                      <span>T</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Wednesday" aria-label="Meeting day: Wednesday">
                      <span>W</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Thursday" aria-label="Meeting day: Thursday">
                      <span>Th</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Friday" aria-label="Meeting day: Friday">
                      <span>F</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Saturday" aria-label="Meeting day: Saturday">
                      <span>S</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                )}
              />
            </FormControl>
            <FormDescription>The day for your one on one's with this team member</FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel className="text-text-primary">Meeting Time</FormLabel>
            <FormControl>
              <Controller
                name="time"
                control={form.control}
                render={({ field }) => <Input type="time" placeholder="Enter meeting time" {...field} />}
              />
            </FormControl>
            <FormDescription>The time for your one on one's with this team member</FormDescription>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel className="text-text-primary">Meeting Frequency</FormLabel>
            <FormControl>
              <Controller
                name="frequency"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Biweekly">Biweekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormControl>
            <FormDescription>The frequency of the 1:1 meetings (e.g., weekly, bi-weekly)</FormDescription>
            <FormMessage />
          </FormItem>
        </div>
        <Button type="submit" variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary">
          Add Member
        </Button>
      </form>
    </Form>
  );
}