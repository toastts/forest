'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginAction, signupAction } from './actions';

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    if (isLogin) {
      await loginAction(formData);
    } else {
      await signupAction(formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-oliveGrey text-white">
      <div className="text-center mb-12">
        <div className="text-5xl mb-12">Forest</div>
        <div className="w-full max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormLabel className="text-text-primary">Password</FormLabel>
                <FormControl>
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field }) => <Input type="password" placeholder="Enter password" {...field} value={field.value ?? ''} />}
                  />
                </FormControl>
                <FormDescription>Your password</FormDescription>
                <FormMessage />
              </FormItem>
              <Button type="submit" variant="outline" className="w-full text-branding-bright border-background-border bg-background-primary">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </form>
          </Form>
          <button onClick={() => setIsLogin(!isLogin)} className="mt-6 text-gray-400 px-0">
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
