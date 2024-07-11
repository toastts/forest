import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface FormQuestionProps {
  question: string;
  answers: string[];
  onAnswerSelect: (answer: string) => void;
}

const FormQuestion: React.FC<FormQuestionProps> = ({ question, answers, onAnswerSelect }) => {
  return (
    <div className="bg-[#282A27] rounded-[20px] w-[592px] p-4">
      <Label className="text-[#AFB5AD]">{question}</Label>
      <Select onValueChange={onAnswerSelect}>
        <SelectTrigger className="mt-2 w-[220px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {answers.map((answer, index) => (
            <SelectItem key={index} value={answer}>
              {answer}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormQuestion;
