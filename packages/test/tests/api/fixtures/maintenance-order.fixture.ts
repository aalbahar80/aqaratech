import * as R from 'remeda';

import { maintenanceOrderFactory } from '@self/seed';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';

export const maintenanceOrderFixtures: AllFixtures = {
	maintenanceOrdersParams: [undefined, { option: true }],

	maintenanceOrders: async ({ org, units, maintenanceOrdersParams }, use) => {
		const params = maintenanceOrdersParams ?? [{}];

		// Merge any declared params with the default params

		const maintenanceOrders = R.times(params.length, (n) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const unit = units[n % units.length]!;

			const data = maintenanceOrderFactory.build({
				organizationId: org.organization.id,
				portfolioId: unit.portfolioId,
				propertyId: unit.propertyId,
				unitId: unit.id,
				...params[n],
			});

			data.completedAt &&= new Date(data.completedAt).toISOString();

			return data;
		});

		// Insert maintenanceOrders

		await prisma.maintenanceOrder.createMany({
			data: maintenanceOrders.map(
				R.pick([
					'organizationId',
					'portfolioId',
					'propertyId',
					'unitId',
					'tenantId',
					'title',
					'description',
					'status',
					'completedAt',
				]),
			),
		});

		const created = await prisma.maintenanceOrder.findMany({
			where: { organizationId: org.organization.id },
		});

		await use(created);
	},

	maintenanceOrder: async ({ maintenanceOrders }, use) => {
		await use(maintenanceOrders[0]);
	},
};
