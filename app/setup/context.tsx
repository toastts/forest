'use client';
//NOTE: We have to make a client component to wrap the context provider
//to play nice with server components, kinda jank :/

import { SetupFormProvider } from "@/components/fds/forms/SetupFormContext";

export const SetupProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <SetupFormProvider>
      {children}
    </SetupFormProvider>
  );
}