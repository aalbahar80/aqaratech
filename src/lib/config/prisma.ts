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

import { PrismaClient } from '@prisma/client';

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma as PrismaClient;
