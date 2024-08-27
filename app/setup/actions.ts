'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// update the user record with the new information
export async function submitUserOnboardAction(formData: {
  name: string;
  role: string,
  prompt: string
}): Promise<boolean> {

  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return false;
  }

  console.log("USER FORM SUBMISSION")
  console.log(formData)

  const res = await supabase
    .from('users')
    .update(formData)
    .eq('id', user.id)

  console.log(res)

  if (res.error) {
    return false;
  }
  return true;
}

export async function submitMeetingOnboardAction(formData: {
  name: string,
  role: string,
  email: string,
  day: string,
  time: string,
  frequency: string
}[]): Promise<boolean> {

  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return false;
  }

  console.log("MEETING FORM SUBMISSION")
  console.log(formData)

  // add user_id to each object in the formData array
  const updatedFormData = formData.map(meeting => ({
    ...meeting,
    user_id: user.id
  }));

  const res = await supabase
    .from('meetings')
    .insert(updatedFormData);

  if (res.error) {
    console.error(res.error);
    return false;
  }

  return true;
}
