import * as React from 'react';
import { MeetingOnboardForm, MeetingOnboardFormValues } from '@/components/fds/forms/MeetingOnboardForm';
import { UserOnboardForm } from '@/components/fds/forms/UserOnboardForm';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

import { useSetupFormContext } from '@/components/fds/forms/SetupFormContext';

export const MultipartForm = () => {
  let { currentStep, meetings } = useSetupFormContext();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {currentStep == 2 && (
        <Card className="w-[600px] bg-background-primary p-8">
          <CardHeader>
            <CardDescription>
              Let's get your meetings set up in Forest. We're trying to let you sync your calendar with stuff like Google Cal but for now you have to do it manually like a loser.
            </CardDescription>
          </CardHeader>
        </Card>
      )
      }


      <Card className="w-[600px] bg-background-primary p-8 mt-4">
        {currentStep === 1 ?
          <UserOnboardForm />
          :
          <MeetingOnboardForm />}
      </Card>

      {meetings.length && meetings.map((meeting, index) => (
        <Card key={index} className="w-[600px] bg-background-primary p-8 mt-4">
          <CardHeader>
            <CardTitle>{meeting.name}</CardTitle>
            <CardDescription>{meeting.role}</CardDescription>
          </CardHeader>
          <p>Email: {meeting.email}</p>
          <p>Meeting Day: {meeting.day}</p>
          <p>Meeting Time: {meeting.time}</p>
          <p>Meeting Frequency: {meeting.frequency}</p>
        </Card>
      ))}
    </div>

  );
}
