import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { TablesInsert, Tables } from '@/lib/database.types';

interface RequestBody {
  userForm: TablesInsert<'users'>;
  meetingForms: TablesInsert<'meetings'>[];
}

export async function POST(request: Request) {
  const { userForm, meetingForms }: RequestBody = await request.json();

  try {
    console.log('Received userForm:', userForm);
    console.log('Received meetingForms:', meetingForms);

    // Save user data
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert([userForm])
      .select('id') // Ensure we select the id field
      .single();

    if (userError) {
      console.error('Error creating user:', userError);
      throw userError;
    }

    if (!user || !user.id) {
      throw new Error('User creation failed or user ID is missing');
    }

    console.log('User created:', user);

    // Save meeting data
    const meetingPromises = meetingForms.map((meetingForm) =>
      supabase
        .from('meetings')
        .insert([{ ...meetingForm, user_id: user.id }])
    );

    const meetings = await Promise.all(meetingPromises);

    console.log('Meetings created:', meetings);

    // Replace email sending with console.log
    console.log('Welcome!');
    console.log(`Email would be sent to: ${userForm.email}`);

    return NextResponse.json({ user, meetings }, { status: 201 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  return NextResponse.json({ message: 'GET request handled' });
}