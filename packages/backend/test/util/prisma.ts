import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
await prisma.$executeRaw`SET session_replication_role = 'replica';`;
export default prisma;
