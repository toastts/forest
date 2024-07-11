"use client";

import * as React from 'react';
import FormQuestion from '@/components/FormQuestion';

export default function SetupPage() {
  const questions = [
    {
      question: "What is your role?",
      answers: ["PM", "SWE", "CEO", "HR"],
    },
    {
      question: "How many people are on your team?",
      answers: ["1-5", "6-10", "11-20", "21+"],
    },
    {
      question: "Select key interests for your team",
      answers: ["Project Management", "Development", "Product Design", "Marketing"],
    },
  ];

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    console.log(`Question ${questionIndex + 1} selected answer:`, answer);
  };

  return (
    <div className="bg-background-primary min-h-screen flex flex-col items-center justify-center space-y-4">
      {questions.map((q, index) => (
        <FormQuestion
          key={index}
          question={q.question}
          answers={q.answers}
          onAnswerSelect={(answer) => handleAnswerSelect(index, answer)}
        />
      ))}
    </div>
  );
}

