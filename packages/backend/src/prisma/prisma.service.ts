import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { computeLabelProperty, computeLabelUnit } from '@self/utils';

@Injectable()
export class PrismaService implements OnModuleInit {
	public c!: ExtendedPrismaClient;

	async onModuleInit() {
		this.c = createPrismaClient();
		await this.c.$connect();
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async enableShutdownHooks(app: INestApplication) {
		// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unnecessary-condition
		this.c?.$on('beforeExit', async () => {
			await app.close();
		});
	}
}

const createPrismaClient = () => {
	const client = new PrismaClient({
		// Consider using built-in debug mode
		// Info: https://www.prisma.io/docs/concepts/components/prisma-client/debugging
		log:
			process.env.PUBLIC_AQ_DEBUG_LEVEL === 'debug'
				? ['info', 'warn', 'error']
				: ['warn', 'error'],
	});

	return client.$extends({
		result: {
			organization: {
				title: {
					needs: { label: true, fullName: true },
					compute(organization) {
						return organization.label ?? organization.fullName;
					},
				},
			},
			tenant: {
				title: {
					needs: { label: true, fullName: true },
					compute(tenant) {
						return tenant.label ?? tenant.fullName;
					},
				},
			},
			portfolio: {
				title: {
					needs: { label: true, fullName: true },
					compute(portfolio) {
						return portfolio.label ?? portfolio.fullName;
					},
				},
			},
			property: {
				title: {
					needs: { label: true, area: true, block: true, number: true },
					compute(property) {
						return property.label ?? computeLabelProperty(property);
					},
				},
			},
			unit: {
				title: {
					needs: { label: true, type: true, unitNumber: true },
					compute(unit) {
						return unit.label ?? computeLabelUnit(unit);
					},
				},
			},
		},
	});
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;
