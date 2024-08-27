'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { randomUUID } from 'crypto'

export async function loginAction(formData: FormData) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    redirect('/error')
    return
  }
  redirect('/_')
}


//TODO: remember to implement client side hashing
export async function signupAction(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email')
  const password = formData.get('password')

  var {data: {user}, error} = await supabase.auth.signUp({
    email: email as string,
    password: password as string,
  })

  console.log(user)

   if (error || !user?.id) {
     redirect('/error')
   }

  // just make a profile in parallel with signup to keep it simple
  // keep the id the same to keep it EVEN simpler
  const mirror = await supabase
    .from('users')
    .insert({
      email: email as string,
      id: user.id
    })


  console.log(mirror)

  if (mirror['error']) {
    redirect('/error')
  }

  redirect('/setup')
}
