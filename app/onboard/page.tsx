import * as React from 'react';
import TeamOnboardForm from '@/components/TeamOnboardForm';

export default function OnboardPage() {
  return (
    <div className="bg-background-primary min-h-screen flex flex-col items-center justify-center space-y-[60px]">
      <div className="text-white text-center">
        <p>Now lets set up your 1:1s for each of your team members.</p>
        <p>Connect your Google Calendar to add them automatically or set them up one by one below.</p>
      </div>

      <TeamOnboardForm />
    </div>
  );
}