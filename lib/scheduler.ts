import cron from 'node-cron';
import { sendEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';

interface Meeting {
  day: string;
  time: string;
  frequency: string;
  team: {
    id: number;
  };
}

export function scheduleEmail(meeting: Meeting) {
  const { day, time, frequency, team } = meeting;
  const cronExpression = getCronExpression(day, time, frequency);

  cron.schedule(cronExpression, async () => {
    const teamMember = await prisma.team.findUnique({ where: { id: team.id } });
    if (teamMember) {
      sendEmail(teamMember.email, 'Meeting Reminder', `You have a meeting scheduled at ${time} on ${day}`);
    }
  });
}

function getCronExpression(day: string, time: string, frequency: string): string {
  const daysOfWeek: { [key: string]: string } = {
    Sunday: '0',
    Monday: '1',
    Tuesday: '2',
    Wednesday: '3',
    Thursday: '4',
    Friday: '5',
    Saturday: '6',
  };

  const [hour, minute] = time.split(':');
  const dayOfWeek = daysOfWeek[day];

  let cronExpression = `${minute} ${hour} * * ${dayOfWeek}`;

  if (frequency === 'Biweekly') {
    cronExpression = `${minute} ${hour} */14 * ${dayOfWeek}`;
  } else if (frequency === 'Monthly') {
    cronExpression = `${minute} ${hour} 1 * ${dayOfWeek}`;
  }

  return cronExpression;
}