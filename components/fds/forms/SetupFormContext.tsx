'use client';

import { Dispatch, SetStateAction, } from "react";
import { createContext, useContext, useState } from "react";
import { MeetingOnboardFormValues } from "@/components/fds/forms/MeetingOnboardForm";

interface SetupFormType {
  meetings: MeetingOnboardFormValues[];
  setMeetings: Dispatch<SetStateAction<MeetingOnboardFormValues[]>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;

}
interface Props {
  children: React.ReactNode;
}

const FormContext = createContext<SetupFormType | null>(null);


// all we need to track is meeting state in the HOC, implement mutating methods
// in the leaves which consume state
export const SetupFormProvider = ({ children }: Props) => {
  const [meetings, setMeetings] = useState<MeetingOnboardFormValues[]>([]);
  const [currentStep, setCurrentStep] = useState(1);


  const values = {
    meetings,
    setMeetings,
    currentStep,
    setCurrentStep,
  };

  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};

export const useSetupFormContext = () => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("context must be used within the context provider");
  }
  return context;
};
