import type { PreprocessedSeed } from './preprocess-seed';
import prisma from './prisma';

export const insertSeed = async (fake: PreprocessedSeed) => {
	logCounts(fake);

	const {
		users,
		organizations,
		roles,
		tenants,
		portfolios,
		properties,
		units,
		leases,
		leaseInvoices,
		expenses,
		payouts,
	} = fake;

	await prisma.user.createMany({ data: users });

	await prisma.organization.createMany({ data: organizations });

	await prisma.tenant.createMany({ data: tenants });

	await prisma.portfolio.createMany({ data: portfolios });

	await prisma.role.createMany({ data: roles });

	await prisma.property.createMany({ data: properties });

	await prisma.unit.createMany({ data: units });

	await prisma.lease.createMany({ data: leases });

	await prisma.leaseInvoice.createMany({ data: leaseInvoices });

	await prisma.expense.createMany({ data: expenses });

	await prisma.payout.createMany({ data: payouts });
};

const logCounts = (fake: PreprocessedSeed) => {
	for (const [key, value] of Object.entries(fake)) {
		console.log(`${key}: ${value.length}`);
	}
};
