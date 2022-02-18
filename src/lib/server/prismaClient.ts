/* eslint-disable @typescript-eslint/ban-ts-comment */
// import type { PrismaClient } from '@prisma/client';
// import Prisma from '@prisma/client';

// export let prisma: PrismaClient;

// if (Prisma === undefined) {
// 	import('@prisma/client').then(({ PrismaClient }) => {
// 		prisma = new PrismaClient();
// 	});
// } else {
// 	prisma = new Prisma.PrismaClient();
// }

// ########

// import Prisma, * as PrismaAll from '@prisma/client';

// const PrismaClient = Prisma?.PrismaClient || PrismaAll?.PrismaClient;

// export default PrismaClient;

// export const prisma = new PrismaClient();

// ########
// https://github.com/prisma/prisma/discussions/9027#discussioncomment-1585810

// /* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
// /* eslint-disable no-var */
// /* eslint-disable vars-on-top */

// import pkg, { PrismaClient } from '@prisma/client';
// import { dev } from '$app/env';

// declare global {
// 	var _prisma: PrismaClient;
// }

// let prisma;
// if (dev) {
// 	if (!global._prisma) {
// 		global._prisma = new PrismaClient();
// 	}
// 	prisma = global._prisma;
// } else {
// 	const { PrismaClient: PrismaClientProd } = pkg;
// 	prisma = new PrismaClientProd();
// }

// export default prisma as PrismaClient; // type assertion for shim

// #########################
// https://docs.planetscale.com/tutorials/prisma-quickstart

// import { PrismaClient } from '@prisma/client';

// const prisma =
// 	// @ts-ignore
// 	global.prisma ||
// 	new PrismaClient({
// 		// log: [{ level: 'query', emit: 'event' }, 'info'],
// 		// errorFormat: 'pretty',
// 	});

// // @ts-ignore
// if (process.env.NODE_ENV === 'development') global.prisma = prisma;

// // @ts-ignore
// // prisma.$on('query', (e) => {
// // 	console.log(e);
// // });
// export default prisma as PrismaClient;

// #########################
// For TRPC https://github.com/icflorescu/trpc-sveltekit
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prismaClient = new PrismaClient();
export default prismaClient;
