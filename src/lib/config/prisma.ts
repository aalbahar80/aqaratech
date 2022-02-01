// import Prisma, * as PrismaAll from '@prisma/client';
// const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient;
// export default PrismaClient;

// import { PrismaClient } from '@prisma/client';
// import pkg from '@prisma/client';
// const { PrismaClient } = pkg;

// export const prismaC = new PrismaClient();

// const getAllTenants = async () => {
// 	const allTenants = await prisma.tenants.findMany({
// 		take: 3,
// 		select: {
// 			id: true,
// 			first_name: true,
// 			civilid: true,
// 		},
// 	});
// 	return allTenants;
// };

// const insertATenant = async () => {
// 	await prisma.tenants.create({
// 		data: {
// 			first_name: 'Rafa',
// 			last_name: 'Nadal',
// 			email: 'abc',
// 			phone: '123',
// 		},
// 	});
// };

// async function main() {
// 	await getAllTenants();
// 	// insertATenant();
// }

// main()
// 	.catch((e) => {
// 		throw e;
// 	})
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 	});

// ##################################################################

import type { PrismaClient } from '@prisma/client';
import Prisma from '@prisma/client';

export let prisma: PrismaClient;

if (Prisma === undefined) {
	import('@prisma/client').then(({ PrismaClient }) => {
		prisma = new PrismaClient();
	});
} else {
	prisma = new Prisma.PrismaClient();
}

// ##################################################################

// Prisma (workaround until Prisma fully supports ESM)
// This works in DEV
// import { dev } from '$app/env';
// import * as Prisma from '@prisma/client';

// // This works in PROD
// import { default as ProdPrisma } from '@prisma/client';

// let { PrismaClient } = Prisma;
// if (!dev) PrismaClient = ProdPrisma.PrismaClient;

// export const prisma = new PrismaClient();
