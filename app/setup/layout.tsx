import React from 'react';
import { SetupFormProvider } from '@/components/fds/forms/SetupFormContext';

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <SetupFormProvider>
      {children}
    </SetupFormProvider>
  );
};

export default AppLayout;
