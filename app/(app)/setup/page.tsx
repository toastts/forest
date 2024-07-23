'use client';

import * as React from 'react';
import { useState } from 'react';
import UserOnboardForm from '@/components/UserOnboardForm';
import TeamOnboardForm from '@/components/TeamOnboardForm';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CombinedFormValues {
  userForm: {
    name: string;
    role: string;
    email: string;
    prompt: string;
  };
  teamForm: {
    name: string;
    role: string;
    email: string;
    day: string;
    time: string;
    frequency: string;
  }[];
}

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CombinedFormValues>>({ teamForm: [] });

  const handleUserFormSubmit = (data: CombinedFormValues['userForm']) => {
    setFormData((prev) => ({ ...prev, userForm: data }));
    setStep(2);
  };

  const handleTeamFormSubmit = async () => {
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

  const handleAddTeamMember = (data: CombinedFormValues['teamForm'][0]) => {
    setFormData((prev) => ({
      ...prev,
      teamForm: [...(prev.teamForm || []), data],
    }));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {step == 2 && 
      <Card className="w-[600px] bg-background-primary p-8">
        <CardHeader>
          <CardDescription>
            Let's get your team and meetings set up in Forest. We're trying to let you sync your calendar but for now you have to do it manually like a loser.
          </CardDescription>
        </CardHeader>
      </Card>
    }
    {/*DISPLAY THE CREATED TEAM MEMBERS HERE*/}
      {formData.teamForm && formData.teamForm.map((member, index) => (
        <Card key={index} className="w-[600px] bg-background-primary p-8 mt-4">
          <CardHeader>
            <CardTitle>{member.name}</CardTitle>
            <CardDescription>{member.role}</CardDescription>
          </CardHeader>
          <div>Email: {member.email}</div>
          <div>Meeting Day: {member.day}</div>
          <div>Meeting Time: {member.time}</div>
          <div>Meeting Frequency: {member.frequency}</div>
        </Card>
      ))}
      <Card className="w-[600px] bg-background-primary p-8 mt-4">
        {step === 1 ?
          <UserOnboardForm onSubmit={handleUserFormSubmit} />
          :
          <TeamOnboardForm onSubmit={handleTeamFormSubmit} onAddMember={handleAddTeamMember} />}
      </Card>
      {step === 2 && formData.teamForm && formData.teamForm.length > 0 && (
        <Button onClick={handleTeamFormSubmit} variant="outline" className="mt-4 self-end">
          Submit
        </Button>
      )}
    </div>
  );
}