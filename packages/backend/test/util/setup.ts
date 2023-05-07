import { beforeEach } from 'vitest';

import prisma from './prisma';
import resetDb from './reset-db';
import { SAMPLE } from './sample';

beforeEach(async () => {
	await resetDb();
	await setupBasicRecords();
});

export async function setupBasicRecords() {
	await prisma.organization.create({
		data: {
			id: '0',
		},
	});

	await prisma.tenant.create({
		data: {
			...SAMPLE.tenant,
			id: '0',
		},
	});

	// await prisma.portfolio.create({
	// 	data: {
	// 		...SAMPLE.portfolio,
	// 		id: '0',
	// 	},
	// });

	// await prisma.property.create({
	// 	data: {
	// 		...SAMPLE.property,
	// 		id: '0',
	// 	},
	// });

	// await prisma.unit.create({
	// 	data: {
	// 		...SAMPLE.unit,
	// 		id: '0',
	// 	},
	// });

	// await prisma.lease.create({
	// 	data: {
	// 		...SAMPLE.lease,
	// 		id: '0',
	// 	},
	// });

	// await prisma.leaseInvoice.create({
	// 	data: {
	// 		...SAMPLE.leaseInvoice,
	// 		id: '0',
	// 	},
	// });

	// await prisma.expense.create({
	// 	data: {
	// 		...SAMPLE.expense,
	// 		id: '0',
	// 	},
	// });
}
