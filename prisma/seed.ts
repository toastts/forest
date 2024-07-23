import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      role: 'Admin',
      email: 'john.doe@example.com',
      team: {
        create: [
          {
            name: 'Team A',
            role: 'Developer',
            email: 'team.a@example.com',
            day: 'Monday',
            time: '10:00',
            frequency: 'Weekly',
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
