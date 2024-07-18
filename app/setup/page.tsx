'use client';

import * as React from 'react';
import { useState } from 'react';
import UserOnboardForm from '@/components/UserOnboardForm';
import TeamOnboardForm from '@/components/TeamOnboardForm';

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
    <div className="setup-page">
      {step === 1 && <UserOnboardForm onSubmit={handleUserFormSubmit} />}
      {step === 2 && <TeamOnboardForm onSubmit={handleTeamFormSubmit} />}
    </div>
  );
}
