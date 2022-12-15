import { PrismaClient } from '@prisma/client';
import {
	createSeed,
	insertSeed,
	preprocessSeed,
	validateSeed,
} from '@self/seed';

const prisma = new PrismaClient();

const raw = createSeed({
	print: false,
	count: {
		properties: 100,
		units: 200,
		leases: 1000,
		expenses: 10000,
		leaseInvoices: 10000,
		payouts: 1000,
		maintenanceOrders: 1000,
	},
});

const data = preprocessSeed(raw);

validateSeed(data);

insertSeed(data)
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
