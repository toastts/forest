import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { scheduleEmail } from '@/lib/scheduler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { teamId, day, time, frequency } = req.body;

    const meeting = await prisma.meeting.create({
      data: {
        day,
        time,
        frequency,
        team: { connect: { id: teamId } },
      },
    });

    scheduleEmail(meeting);

    res.status(201).json(meeting);
  } else {
    res.status(405).end();
  }
}