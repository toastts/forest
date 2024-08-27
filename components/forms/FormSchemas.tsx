import { z } from 'zod';

// user onboard zod schema object
export const UserOnboardFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  role: z.string().trim().min(1, { message: 'Role is required' }),
  prompt: z.string().trim().min(1, { message: 'Prompt is required' }),
});

// meeting onboard zod schema object
export const MeetingOnboardFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  role: z.string().trim().min(1, { message: 'Role is required' }),
  email: z.string().trim().email({ message: 'Invalid email address' }),
  day: z.enum([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ]),
  time: z.string().transform((val) => val + ':00'),
  frequency: z.enum([
    'daily',
    'weekly',
    'biweekly',
    'monthly'
  ]),
});

export enum Day {
  Sunday = 'sunday',
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
}

export enum Frequency {
  Daily = 'daily',
  Weekly = 'weekly',
  Biweekly = 'biweekly',
  Monthly = 'monthly'
}
