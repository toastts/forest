import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface UserForm {
  name: string;
  role: string;
  email: string;
}

interface MeetingForm {
  name: string;
  role: string;
  email: string;
  day: string;
  time: string;
  frequency: string;
}

interface RequestBody {
  userForm: UserForm;
  meetingForms: MeetingForm[];
}

export async function POST(request: Request) {
  const { userForm, meetingForms }: RequestBody = await request.json();

  try {
    console.log('Received userForm:', userForm);
    console.log('Received meetingForms:', meetingForms);

    // Save user data
    const user = await prisma.user.create({
      data: {
        name: userForm.name,
        role: userForm.role,
        email: userForm.email,
      },
    });

    console.log('User created:', user);

    // Save meeting data
    const meetingPromises = meetingForms.map((meetingForm) =>
      prisma.meeting.create({
        data: {
          name: meetingForm.name,
          role: meetingForm.role,
          email: meetingForm.email,
          day: meetingForm.day,
          time: meetingForm.time,
          frequency: meetingForm.frequency,
          userId: user.id,
        },
      })
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