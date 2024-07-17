import { NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI();

export async function POST(request: Request) {
  const { dummyUserOnboardData } = await request.json();
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are an assistant who analyzes JSON data which describes my team at work which I am the leader of. My name is Haris, which you can use as my name when you talk to me. All of the meetings I have in my team in the JSON data are people who are under me on my team, and the meetings I have scheduled are the one-on-one meetings I have with my team member. Your job is to analyze the data you get about me and my answers about myself to provide insights about me and my schedule.' },
      { role: 'user', content: JSON.stringify(dummyUserOnboardData) },
      { role: 'user', content: 'Can you give me a summary of my schedule? Write it in a professional tone so that I can share it with my coworkers' },
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);

  return NextResponse.json({ result: completion.choices[0].message.content });
}
