import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation';

export async function POST(request: Request) {
  const { formType, formData }: {
    formType: string; formData: {
      name: string,
      role: string,
      prompt: string
    }
  } = await request.json();

  try {
    switch (formType) {
      case 'userForm':
        const supabase = createClient()
        const { data, error } = await supabase.auth.getUser()

        if (error || !data?.user) {
          console.log("USER NOT AUTH'D");
          //redirect('')
          //RETURN ERROR HERE
        }

        else {
        }

        const submissionData = {
          ...formData,
          ...data
        }

        const userProfile = {
          ...data,

        }
        

      return new Response('')



      ///////////////////
      case 'meetingForm':
      default:

        throw new Error('Invalid form type');
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ message: 'GET request handled' });
}

/*
user: {
    id: 'e4d3bf81-de07-4635-9c3a-caf1d2392901',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'sshar1q@icloud.com',
    email_confirmed_at: '2024-08-14T04:06:00.334962Z',
    phone: '',
    confirmed_at: '2024-08-14T04:06:00.334962Z',
    last_sign_in_at: '2024-08-21T19:37:36.330419Z',
    app_metadata: { provider: 'email', providers: [Array] },
    user_metadata: {
      email: 'sshar1q@icloud.com',
      email_verified: false,
      phone_verified: false,
      sub: 'e4d3bf81-de07-4635-9c3a-caf1d2392901'
    },
    identities: [ [Object] ],
    created_at: '2024-08-14T04:06:00.316928Z',
    updated_at: '2024-08-21T19:37:36.340184Z',
    is_anonymous: false
  }
*/
