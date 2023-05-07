import { createPrismaClient } from 'src/prisma/prisma.service';

const prisma = createPrismaClient();
// @ts-expect-error vitest set to es6
await prisma.$executeRaw`SET session_replication_role = 'replica';`;
export default prisma;
