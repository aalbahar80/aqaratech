/* eslint-disable @typescript-eslint/ban-ts-comment */
import pkg from '@prisma/client';
import type { PrismaClient as PrismaClientType } from '@prisma/client';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({
	path: process.env.TEST_DB ? './.env.test' : './.env',
	override: true,
	debug: true,
});

const { PrismaClient } = pkg;

const prismaClient =
	// @ts-ignore
	global.prismaClient ||
	new PrismaClient({
		// log: [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'],
		// errorFormat: 'pretty',
		datasources: { db: { url: db } },
	});

if (process.env.NODE_ENV === 'development') {
	// @ts-ignore
	global.prismaClient = prismaClient;
}
// prismaClient.$on('query', (e: any) => {
// 	console.log(e);
// });
export default prismaClient as PrismaClientType;
