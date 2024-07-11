'use client';

import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormQuestion from '@/components/FormQuestion';
import { Button } from '@/components/ui/button';

export default function SetupPage() {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const router = useRouter();

  const questions = [
    {
      question: "What is your role?",
      answers: ["PM", "SWE", "CEO", "HR", "CPO", "Leader"],
      placeholder: "select role"
    },
    {
      question: "How many people are on your team?",
      answers: ["1-5", "6-10", "11-20", "21+"],
      placeholder: "select size"
    },
    {
      question: "Select a template for your 1:1s",
      answers: ["Casual", "Progress Checkin", "Performance Plan", "Status Update"],
      placeholder: "select template"
    },
    {
      question: "How can Forest help you improve your 1:1 meetings?",
      isFreeAnswer: true,
      placeholder: "e.g. encourage me and give me kudos so i can withstand this job"
    }
  ];

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleInputChange = (questionIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: e.target.value }));
  };

  const allQuestionsAnswered = questions.length === Object.keys(answers).length && Object.values(answers).every(answer => answer !== '');

  const handleContinue = () => {
    console.log('Form answers:', answers);
    // router.push('/nextPage'); // Uncomment this line to navigate to the next page
  };

  return (
    <div className="bg-background-primary min-h-screen flex flex-col items-center justify-center space-y-[60px]">
      {questions.map((q, index) => (
        <FormQuestion
          key={index}
          question={q.question}
          answers={q.answers}
          onAnswerSelect={q.isFreeAnswer ? undefined : (answer) => handleAnswerSelect(index, answer)}
          isFreeAnswer={q.isFreeAnswer}
          placeholder={q.placeholder}
          onInputChange={q.isFreeAnswer ? (e) => handleInputChange(index, e) : undefined}
        />
      ))}
      {allQuestionsAnswered && (
        <Button
          variant="outline"
          className="mt-6 text-branding-bright border-background-border bg-background-primary w-[600px]"
          onClick={handleContinue}
        >
          Continue
        </Button>
      )}
    </div>
  );
}
