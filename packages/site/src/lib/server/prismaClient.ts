/* eslint-disable @typescript-eslint/ban-ts-comment */
import pkg from '@prisma/client';
import type { PrismaClient as PrismaClientType } from '@prisma/client';

const { PrismaClient } = pkg;

const TEST_DATABASE_URL =
	'mysql://lp5w7h865rnm:pscale_pw_HuGMgxfTQ4X1-bW1BXm0xkYNnIBhjX5o4BjPP8G8cqE@kz17sp33s8ut.ap-south-2.psdb.cloud/aqaratechdb?sslaccept=strict';

let db: string;

if (process.env.TEST_DB || process.env.CI) {
	console.log('Using test database:', TEST_DATABASE_URL);
	db = TEST_DATABASE_URL;
} else {
	console.log('from env database:', process.env.DATABASE_URL);
	db = process.env.DATABASE_URL;
}

const prismaClient =
	// @ts-ignore
	global.prismaClient ||
	new PrismaClient({
		// log: [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'],
		// errorFormat: 'pretty',
		datasources: { db: { url: db } },
	});

if (process.env.NODE_ENV === 'development' || process.env.CI) {
	// @ts-ignore
	global.prismaClient = prismaClient;
}
// prismaClient.$on('query', (e: any) => {
// 	console.log(e);
// });
export default prismaClient as PrismaClientType;
