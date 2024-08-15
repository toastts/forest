'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MeetingOnboardFormSchema, MeetingOnboardFormValues } from '@/components/fds/forms/MeetingOnboardForm'

import { UserOnboardFormSchema } from '@/components/fds/forms/FormSchemas'

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function handleUserOnboardFormSubmitAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  const formObj = Object.fromEntries(formData)
  const parsed = MeetingOnboardFormSchema.safeParse(formObj)


  // send them back to login if there's no session
  if (error || !data?.user) {
    redirect('/login')
  }

  const submissionData = {
    ...formData,
    ...data
  }


  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formObj[key].toString();
    }
    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  return { success: "true", message: "User profile created" };
}

export async function handleMeetingOnboardFormSubmitAction(formData: MeetingOnboardFormValues[]) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  const submissionData = {
    ...formData,
    ...data
  }
  console.log(submissionData)

  // send them back to login if there's no session
  if (error || !data?.user) {
    redirect('/login')
  }

}

