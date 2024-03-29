const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seedRoles = async () => {
  const rolesData = [
    { role: 'admin' },
    { role: 'user' },
    { role: 'superadmin' },
  ];

  await prisma.roles.createMany({
    data: rolesData,
  });

};

const seedStatus = async () => {
  const statusData = [
    { name: 'pending' },
    { name: 'completed' },
    { name: 'cancelled' },
  ];

  await prisma.status.createMany({
    data: statusData,
  });

};

const main = async () => {
  try {
    await seedRoles();
    await seedStatus();
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
