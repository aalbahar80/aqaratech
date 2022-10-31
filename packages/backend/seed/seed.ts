import { PrismaClient } from '@prisma/client';
import { createSeed, insertSeed, preprocessSeed } from '@self/seed';

const prisma = new PrismaClient();

const raw = createSeed();

const data = preprocessSeed(raw);

insertSeed(data)
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
