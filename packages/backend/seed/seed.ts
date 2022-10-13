import { PrismaClient } from '@prisma/client';
import { seed } from '@self/seed';

const prisma = new PrismaClient();

seed({ printOnly: false })
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
