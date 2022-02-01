import Prisma, * as PrismaAll from '@prisma/client';

const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient;
// import { PrismaClient } from '@prisma/client';
// import pkg from '@prisma/client';
// const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getAllTenants = async () => {
	const allTenants = await prisma.tenants.findMany({
		take: 3,
		select: {
			id: true,
			first_name: true,
			civilid: true,
		},
	});
	return allTenants;
};

const insertATenant = async () => {
	await prisma.tenants.create({
		data: {
			first_name: 'Rafa',
			last_name: 'Nadal',
			email: 'abc',
			phone: '123',
		},
	});
};

async function main() {
	await getAllTenants();
	// insertATenant();
}

main()
	.catch((e) => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
