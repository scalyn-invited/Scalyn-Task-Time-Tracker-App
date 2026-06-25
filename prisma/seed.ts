import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type SeedUser = {
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'MEMBER';
};

const demoUsers: SeedUser[] = [
  {
    name: 'Admin User',
    email: 'admin@scalyn.local',
    role: 'ADMIN',
  },
  {
    name: 'Manager User',
    email: 'manager@scalyn.local',
    role: 'MANAGER',
  },
  {
    name: 'Member User',
    email: 'member@scalyn.local',
    role: 'MEMBER',
  },
];

async function main(): Promise<void> {
  const saltRounds = Number.parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '12', 10);
  const passwordHash = await bcrypt.hash('Password123!', Number.isNaN(saltRounds) ? 12 : saltRounds);

  for (const user of demoUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: passwordHash,
        role: user.role,
      },
      create: {
        name: user.name,
        email: user.email,
        password: passwordHash,
        role: user.role,
      },
    });
  }
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
