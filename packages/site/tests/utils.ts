// Unused
import {
	fakePortfolio,
	fakeTenant,
	testPortfolioEmail,
	testPortfolioId,
	testTenantEmail,
	testTenantId,
} from '@self/seed';
import prisma from '../src/lib/server/prismaClient.js';

export async function cleanupDatabase() {
	console.time('cleanup');
	await prisma.$transaction([
		prisma.$executeRaw`DELETE FROM Expense`,
		prisma.$executeRaw`DELETE FROM ExpenseCategory`,
		prisma.$executeRaw`DELETE FROM ExpenseGroup`,
		prisma.$executeRaw`DELETE FROM MaintenanceOrder`,
		prisma.$executeRaw`DELETE FROM Lease`,
		prisma.$executeRaw`DELETE FROM Unit`,
		prisma.$executeRaw`DELETE FROM Property`,
		prisma.$executeRaw`DELETE FROM Portfolio`,
		prisma.$executeRaw`DELETE FROM Tenant`,
		prisma.$executeRaw`DELETE FROM Transaction`,
	]);
	console.timeEnd('cleanup');
}

export const setupTenant = async () => {
	console.time('creating test tenant');
	await prisma.tenant.create({
		data: {
			...fakeTenant(),
			email: testTenantEmail,
			id: testTenantId,
		},
	});
	console.timeEnd('creating test tenant');
};

export const setupPortfolio = async () => {
	console.time('creating test portfolio');
	await prisma.portfolio.create({
		data: {
			...fakePortfolio(),
			email: testPortfolioEmail,
			id: testPortfolioId,
		},
	});
	console.timeEnd('creating test portfolio');
};
