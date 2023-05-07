import { createPrismaClient } from 'src/prisma/prisma.service';

const prisma = createPrismaClient();
await prisma.$executeRaw`SET session_replication_role = 'replica';`;
export default prisma;
