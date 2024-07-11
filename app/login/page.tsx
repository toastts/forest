'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // for now we're just skipping actually setting this up
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    router.push('/setup');
  };

  const handleSkip = () => {
    router.push('/setup');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-oliveGrey text-white">
      <div className="text-center mb-12">
        <div className="text-5xl mb-12">Forest</div>
        <div className="w-full max-w-sm">
          <div className="mb-4">
            <button className="w-full py-2 bg-oliveGrey border border-gray-600 rounded-md text-green-400">Slack</button>
          </div>
          <form onSubmit={handleEmailSubmit} className="w-full">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full p-2 mb-4 bg-oliveGrey border border-gray-600 rounded-md text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button type="submit" className="w-full py-2 bg-oliveGrey border border-gray-600 rounded-md text-green-400">
              Submit
            </button>
          </form>
        </div>
        <button onClick={handleSkip} className="mt-6 text-gray-400 px-0">
          Skip
        </button>
      </div>
    </div>
  );
}

