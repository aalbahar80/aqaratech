// import { PrismaClient } from '@prisma/client';

// // add prisma to the NodeJS global type
// interface CustomNodeJsGlobal extends NodeJS.Global {
// 	prisma: PrismaClient;
// }

// // Prevent multiple instances of Prisma Client in development
// declare const global: CustomNodeJsGlobal;

// const prisma =
// 	global.prisma ||
// 	new PrismaClient({
// 		log: [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'],
// 		errorFormat: 'pretty',
// 	});

// if (process.env.NODE_ENV === 'development' || process.env.REUSE_PRISMA)
// 	global.prisma = prisma;

// // prisma.$on('query', (e: any) => {
// // 	console.log(e);
// // });
// export default prisma;

// https://github.com/prisma/prisma/discussions/9027#discussioncomment-1585810
import pkg, { PrismaClient } from '@prisma/client';

const dev = true;
declare global {
	var _prisma: PrismaClient; // eslint-disable-line
}

let prisma;
if (dev) {
	if (!global._prisma) {
		global._prisma = new PrismaClient();
	}
	prisma = global._prisma;
} else {
	const { PrismaClient: PrismaClientProd } = pkg;
	prisma = new PrismaClientProd();
}

export default prisma as PrismaClient; // type assertion for shim
