/* eslint-disable @typescript-eslint/ban-ts-comment */
import pkg from '@prisma/client';
import type { PrismaClient as PrismaClientType } from '@prisma/client';

const { PrismaClient } = pkg;

export const TEST_DATABASE_URL =
	'mysql://lp5w7h865rnm:pscale_pw_HuGMgxfTQ4X1-bW1BXm0xkYNnIBhjX5o4BjPP8G8cqE@kz17sp33s8ut.ap-south-2.psdb.cloud/aqaratechdb?sslaccept=strict';

const prismaClient =
	// @ts-ignore
	global.prismaClient ||
	new PrismaClient({
		// log: [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'],
		// errorFormat: 'pretty',
		datasources: {
			db: {
				url:
					process.env.TEST_DB || process.env.CI
						? TEST_DATABASE_URL
						: process.env.DATABASE_URL,
			},
		},
	});

if (process.env.NODE_ENV === 'development' || process.env.CI)
	// @ts-ignore
	global.prismaClient = prismaClient;

// prismaClient.$on('query', (e: any) => {
// 	console.log(e);
// });
export default prismaClient as PrismaClientType;
