/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { PrismaClient as PrismaClientType } from '@prisma/client';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prismaClient =
	// @ts-ignore
	global.prismaClient ||
	new PrismaClient({
		// log: [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'],
		// errorFormat: 'pretty',
	});

if (process.env.NODE_ENV === 'development') {
	// @ts-ignore
	global.prismaClient = prismaClient;
}
// prismaClient.$on('query', (e: any) => {
// 	console.log(e);
// });
export default prismaClient as PrismaClientType;
