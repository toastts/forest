'use client';

import * as React from 'react';
import { useFormState } from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { handleUserOnboardFormSubmitAction } from '@/app/setup/actions';
import { useSetupFormContext } from '@/components/fds/forms/SetupFormContext';
import { UserOnboardFormSchema } from '@/components/fds/forms/FormSchemas';


export const UserOnboardForm = () => {
  const { setCurrentStep } = useSetupFormContext()
  const [state, formAction] = useFormState(handleUserOnboardFormSubmitAction, {
    message: "",
  })
  const form = useForm<z.output<typeof UserOnboardFormSchema>>({
    resolver: zodResolver(UserOnboardFormSchema),
    defaultValues: {
      name: "",
      role: "",
      prompt: "",
      ...(state?.fields ?? {})
    },
  });

  const handleSubmit = async (data: z.output<typeof UserOnboardFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("role", data.role);
    formData.append("prompt", data.prompt);
    await handleUserOnboardFormSubmitAction(formData);
    setCurrentStep(2);

  }

  return (
    <Form {...form}>
      <form action={formAction} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

        <FormItem>
          <FormLabel className="text-text-primary">Role</FormLabel>
          <FormControl>
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => <Input placeholder="Bubba" {...field} />}
            />
          </FormControl>
          <FormDescription>What should we call you?</FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel className="text-text-primary">Role</FormLabel>
          <FormControl>
            <Controller
              name="role"
              control={form.control}
              render={({ field }) => <Input placeholder="Product Manager" {...field} />}
            />
          </FormControl>
          <FormDescription>What do you do?</FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel className="text-text-primary">How can Forest help you with your 1:1s?</FormLabel>
          <FormControl>
            <Controller
              name="prompt"
              control={form.control}
              render={({ field }) => <Textarea placeholder="Help me remember personal details" {...field} value={field.value ?? ''} />}
            />
          </FormControl>
          <FormDescription>What's something you want to improve on?</FormDescription>
          <FormMessage />
        </FormItem>
        <Button type="submit" variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary">
          Submit
        </Button>
      </form>
    </Form>
  );
}
