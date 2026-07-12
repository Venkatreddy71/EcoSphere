import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('[POSTGRES] Connected to PostgreSQL via Prisma');
  } catch (error) {
    console.error(`[POSTGRES_ERROR] ${error.message}`);
    process.exit(1);
  }
};

export { prisma };
export default connectDB;
