//@ts-check
require('dotenv').config({
	path: '../../../.env.test',
});

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanupDatabase() {
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

const setupTenant = async () => {
	console.time('creating test tenant');
	await prisma.tenant.create({
		data: {
			id: '3dcef1c0-aae7-4766-968e-ad31b443bcc9',
			createdAt: new Date(),
			updatedAt: new Date(),
			firstName: 'نعيم',
			secondName: 'الشيباني',
			thirdName: null,
			lastName: 'بن عاشور',
			civilid: '259618795849',
			dob: new Date(),
			phone: '14347945',
			email: 'tenant.dev@mailthink.net',
			passportNum: '346780239',
			nationality: 'CV',
			residencyNum: '534184025',
			residencyEnd: new Date(),
			contactMethod: null,
		},
	});
	console.timeEnd('creating test tenant');
};

const setupClient = async () => {
	console.time('creating test client');
	await prisma.client.create({
		data: {
			id: 'c0183a5d-2875-488b-b86f-e1c5628262df',
			createdAt: new Date(),
			updatedAt: new Date(),
			isActive: true,
			firstName: 'عمر',
			secondName: 'ادريس',
			thirdName: null,
			lastName: 'شقرون',
			civilid: '360506007960',
			phone: '11096260',
			email: 'client.dev@mailthink.net',
			dob: new Date(),
		},
	});
	console.timeEnd('creating test client');
};

async function main() {
	await cleanupDatabase();
	await Promise.all([await setupClient(), await setupTenant()]);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
