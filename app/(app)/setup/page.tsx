'use client';

import * as React from 'react';
import { useState } from 'react';
import UserOnboardForm from '@/components/UserOnboardForm';
import TeamOnboardForm from '@/components/TeamOnboardForm';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
  };
}

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CombinedFormValues>>({});

  const handleUserFormSubmit = (data: CombinedFormValues['userForm']) => {
    setFormData((prev) => ({ ...prev, userForm: data }));
    setStep(2);
  };

  const handleTeamFormSubmit = (data: CombinedFormValues['teamForm']) => {
    setFormData((prev) => ({ ...prev, teamForm: data }));
    console.log('Final form data:', { ...formData, teamForm: data });
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
      <Card className="w-[600px] bg-background-primary p-8 mt-4">
        {step === 1 ?
          <UserOnboardForm onSubmit={handleUserFormSubmit} />
          :
          <TeamOnboardForm onSubmit={handleTeamFormSubmit} />}
      </Card>
    </div>
  );
}
