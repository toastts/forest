import cron from 'node-cron';
import { sendEmail } from '@/lib/email';
import { prisma } from '@/lib/prisma';

interface Meeting {
  day: string;
  time: string;
  frequency: string;
  user: {
    id: number;
  };
  name: string;
  role: string;
  email: string;
}

export function scheduleEmail(meeting: Meeting) {
  const { day, time, frequency, user, name, role, email } = meeting;
  const cronExpression = getCronExpression(day, time, frequency);

  cron.schedule(cronExpression, async () => {
    const userRecord = await prisma.user.findUnique({ where: { id: user.id } });
    if (userRecord) {
      sendEmail(userRecord.email, 'Meeting Reminder', `You have a meeting scheduled at ${time} on ${day} with ${name} (${role}) at ${email}`);
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