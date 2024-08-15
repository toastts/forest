import { z } from 'zod';

// user onboard zod schema object
export const UserOnboardFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  role: z.string().trim().min(1, { message: 'Role is required' }),
  prompt: z.string().trim().min(1, { message: 'Prompt is required' }),
});


// meeting onboard zod schema object
export const MeetingOnboardFormClientSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  role: z.string().trim().min(1, { message: 'Role is required' }),
  email: z.string().trim().email({ message: 'Invalid email address' }),
  day: z.enum([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]),
  //kinda jank way to validate a time string but input=time sorta guarantees type safety
  time: z.string().transform((val) => val + ':00'),
  frequency: z.enum([
    'Daily',
    'Weekly',
    'Biweekly',
    'Monthly'
  ]),
});

// meeting onboard server validation object
export const MeetingOnboardFormServerSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  role: z.string().trim().min(1, { message: 'Role is required' }),
  email: z.string().trim().email({ message: 'Invalid email address' }),
  day: z.enum([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]),
  //validate the change by the client parser
  time: z.string().time(),
  frequency: z.enum([
    'Daily',
    'Weekly',
    'Biweekly',
    'Monthly'
  ]),
});
