/* eslint-disable @typescript-eslint/ban-ts-comment */
import pkg from '@prisma/client';
import type { PrismaClient as PrismaClientType } from '@prisma/client';

const { PrismaClient } = pkg;

const prismaClient =
	global.prismaClient ||
	new PrismaClient({
		// log: [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'],
		// errorFormat: 'pretty',
	});

if (process.env.NODE_ENV === 'development' || process.env.LOCAL)
	global.prismaClient = prismaClient;

// prismaClient.$on('query', (e: any) => {
// 	console.log(e);
// });
export default prismaClient as PrismaClientType;
