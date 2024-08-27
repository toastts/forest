'use client';

import { useForm, Controller } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { useSetupFormContext } from '@/components/forms/SetupFormContext';
import { UserOnboardFormSchema } from '@/components/forms/FormSchemas';
import { submitUserOnboardAction } from '@/app/setup/actions';

export const UserOnboardForm = () => {
  const { setCurrentStep } = useSetupFormContext()
  const form = useForm<z.output<typeof UserOnboardFormSchema>>({
    resolver: zodResolver(UserOnboardFormSchema),
    defaultValues: {
      name: "",
      role: "",
      prompt: "",
    },
  });

  const onSubmit = async (data: {
    name: string;
    role: string,
    prompt: string
  }) => {
    console.log(data)
    const submission = await submitUserOnboardAction(data);
    console.log(submission)
    if (!submission) {
      console.log('ERROR ON USER SUBMIT')
    }
    else {
      setCurrentStep(2);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
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
