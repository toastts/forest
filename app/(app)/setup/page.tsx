'use client';

import * as React from 'react';
import { useState } from 'react';
import UserOnboardForm from '@/components/UserOnboardForm';
import MeetingOnboardForm from '@/components/MeetingOnboardForm';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TablesInsert } from '@/lib/database.types';

interface CombinedFormValues {
  userForm: TablesInsert<'users'>;
  meetingForms: TablesInsert<'meetings'>[];
}

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CombinedFormValues>>({ meetingForms: [] });

  const handleUserFormSubmit = (data: CombinedFormValues['userForm']) => {
    setFormData((prev) => ({ ...prev, userForm: data }));
    setStep(2);
  };

  const handleMeetingFormSubmit = async () => {
    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('API Response:', result);
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleAddMeeting = (data: CombinedFormValues['meetingForms'][0]) => {
    setFormData((prev) => ({
      ...prev,
      meetingForms: [...(prev.meetingForms || []), data],
    }));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {step == 2 &&
        <Card className="w-[600px] bg-background-primary p-8">
          <CardHeader>
            <CardDescription>
              Let's get your meetings set up in Forest. We're trying to let you sync your calendar but for now you have to do it manually like a loser.
            </CardDescription>
          </CardHeader>
        </Card>
      }
      {formData.meetingForms && formData.meetingForms.map((meeting, index) => (
        <Card key={index} className="w-[600px] bg-background-primary p-8 mt-4">
          <CardHeader>
            <CardTitle>{meeting.name}</CardTitle>
            <CardDescription>{meeting.role}</CardDescription>
          </CardHeader>
          <div>Email: {meeting.email}</div>
          <div>Meeting Day: {meeting.day}</div>
          <div>Meeting Time: {meeting.time}</div>
          <div>Meeting Frequency: {meeting.frequency}</div>
        </Card>
      ))}
      <Card className="w-[600px] bg-background-primary p-8 mt-4">
        {step === 1 ?
          <UserOnboardForm onSubmit={handleUserFormSubmit} />
          :
          <MeetingOnboardForm onSubmit={handleMeetingFormSubmit} onAddMeeting={handleAddMeeting} />}
      </Card>
      {step === 2 && formData.meetingForms && formData.meetingForms.length > 0 && (
        <Button onClick={handleMeetingFormSubmit} variant="outline" className="mt-4 self-end">
          Submit
        </Button>
      )}
    </div>
  );
}