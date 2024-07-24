import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { scheduleEmail } from '@/lib/scheduler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, name, role, email, day, time, frequency } = req.body;

    const meeting = await prisma.meeting.create({
      data: {
        name,
        role,
        email,
        day,
        time,
        frequency,
        userId,
      },
    });

    scheduleEmail(meeting);

    res.status(201).json(meeting);
  } else {
    res.status(405).end();
  }
}