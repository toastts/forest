import FormCard from '@/components/FormCard';

export default function SetupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-oliveGrey text-white">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-md">
        <h1 className="text-2xl mb-4">Setup Page</h1>
        <FormCard question="What is your role?" type="select" options={['Developer', 'Designer', 'Manager']} />
        <FormCard question="How many people are on your team?" type="select" options={['1-5', '6-10', '11-20']} />
        {/* Add more FormCard components as needed */}
        <button className="w-full mt-4 p-2 bg-green-500 rounded-md">Submit</button>
      </div>
    </div>
  );
}

