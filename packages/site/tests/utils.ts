import {
	fakeClient,
	fakeTenant,
	testClientEmail,
	testClientId,
	testTenantEmail,
	testTenantId,
} from '../../seed/generators';
import prisma from './config/prismaClient';

export async function cleanupDatabase() {
	console.time('cleanup');
	await prisma.$transaction([
		prisma.$executeRaw`DELETE FROM Expense`,
		prisma.$executeRaw`DELETE FROM MaintenanceOrder`,
		prisma.$executeRaw`DELETE FROM Lease`,
		prisma.$executeRaw`DELETE FROM Unit`,
		prisma.$executeRaw`DELETE FROM Property`,
		prisma.$executeRaw`DELETE FROM Client`,
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

export const setupClient = async () => {
	console.time('creating test client');
	await prisma.client.create({
		data: {
			...fakeClient(),
			email: testClientEmail,
			id: testClientId,
		},
	});
	console.timeEnd('creating test client');
};
