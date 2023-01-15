import { PrismaClient } from '@prisma/client';
import { config as dotenv } from 'dotenv';

import {
	createSeed,
	insertSeed,
	preprocessSeed,
	validateSeed,
} from '@self/seed';
import { envSchema } from '@self/utils';

import { createBucketDev } from './create-bucket';

dotenv({
	path: '../../../.env',
});

const env = envSchema
	.pick({
		PUBLIC_AQARATECH_ENV: true,
		R2_ENDPOINT: true,
		R2_ACCESS_KEY_ID: true,
		R2_SECRET_ACCESS_KEY: true,
	})
	.parse(process.env);

if (env.PUBLIC_AQARATECH_ENV === 'production') {
	throw new Error('Seed script should not be run in production');
}

const prisma = new PrismaClient();

const raw = createSeed({
	print: false,
	count: {
		properties: 100,
		units: 200,
		leases: 1000,
		expenses: 10000,
		leaseInvoices: 10000,
		payouts: 1000,
		maintenanceOrders: 1000,
	},
});

const data = preprocessSeed(raw);

validateSeed(data);

// eslint-disable-next-line promise/catch-or-return
insertSeed(data)
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => {
		void prisma.$disconnect();
	});

// Create s3 bucket for seed organizations.
// Usually, buckets are created by the backend when an organization is created.
// But in dev, we need to create the bucket manually.
createBucketDev(
	data.organizations.map((n) => n.id),
	env,
).catch((e) => {
	console.error(e);
	process.exit(1);
});
