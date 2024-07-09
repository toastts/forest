import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import { Label } from '@radix-ui/react-label';

const FormCard = ({ question, type, options }) => {
  return (
    <div className="my-4 p-4 bg-gray-800 rounded-md">
      <Label className="block text-gray-300 mb-2">{question}</Label>
      {type === 'text' && (
        <input type="text" className="w-full p-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      )}
      {type === 'select' && (
        <Select>
          <SelectTrigger className="w-full p-2 bg-gray-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 rounded-md">
            {options.map((option) => (
              <SelectItem key={option} value={option} className="p-2 hover:bg-gray-600">
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      {/* Add more input types as needed */}
    </div>
  );
};

export default FormCard;

