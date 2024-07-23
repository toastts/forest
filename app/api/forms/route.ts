import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userForm, teamForm } = req.body;

    try {
      // Save user data
      const user = await prisma.user.create({
        data: {
          name: userForm.name,
          role: userForm.role,
          email: userForm.email,
        },
      });

      // Save team data
      const teamPromises = teamForm.map((teamMember) =>
        prisma.team.create({
          data: {
            name: teamMember.name,
            role: teamMember.role,
            email: teamMember.email,
            day: teamMember.day,
            time: teamMember.time,
            frequency: teamMember.frequency,
            userId: user.id,
          },
        })
      );

      const teams = await Promise.all(teamPromises);

      // Send email using Resend
      await resend.sendEmail({
        from: 'no-reply@yourapp.com',
        to: userForm.email,
        subject: 'Welcome to Forest',
        text: 'Your team has been successfully set up.',
      });

      res.status(201).json({ user, teams });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save data' });
    }
  } else {
    res.status(405).end();
  }
}
