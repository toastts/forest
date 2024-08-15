import React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface FormQuestionProps {
  question: string;
  answers?: string[];
  onAnswerSelect?: (answer: string) => void;
  isFreeAnswer?: boolean;
  placeholder?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormQuestion: React.FC<FormQuestionProps> = ({ question, answers = [], onAnswerSelect, isFreeAnswer = false, placeholder = null, onInputChange }) => {
  return (
    <div className={`bg-[#282A27] rounded-[20px] w-[600px] px-[24px] py-[8px] ${isFreeAnswer ? 'flex flex-col space-y-2' : 'flex items-center justify-between space-x-4'}`}>
      <Label className="text-[#AFB5AD] whitespace-nowrap">{question}</Label>
      {isFreeAnswer ? (
        <Input
          className="h-8 w-full mt-2"
          onChange={onInputChange}
          placeholder={placeholder ?? "Type your answer here"}
        />
      ) : (
        <Select onValueChange={onAnswerSelect}>
          <SelectTrigger className="h-8 w-[148px] rounded-[20px]">
            <SelectValue placeholder={placeholder ?? "Select an option"} />
          </SelectTrigger>
          <SelectContent className="rounded-[20px]">
            {answers.map((answer, index) => (
              <SelectItem key={index} value={answer}>
                {answer}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default FormQuestion;
