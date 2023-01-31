import * as R from 'remeda';

import { unitFactory } from '@self/seed';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';

export const unitFixtures: AllFixtures = {
	unitsParams: [undefined, { option: true }],

	units: async ({ org, properties, unitsParams }, use) => {
		const params = unitsParams ?? [{}];

		// Merge any declared params with the default params

		const units = R.times(params.length, (n) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const property = properties[n % properties.length]!;
			return unitFactory.build({
				organizationId: org.organization.id,
				portfolioId: property.portfolioId,
				propertyId: property.id,
				...params[n],
			});
		});

		// Insert units

		await prisma.unit.createMany({
			data: units.map(
				R.pick([
					'organizationId',
					'portfolioId',
					'propertyId',
					'unitNumber',
					'type',
				]),
			),
		});

		const created = await prisma.unit.findMany({
			where: { organizationId: org.organization.id },
		});

		await use(created);
	},

	unit: async ({ units }, use) => {
		await use(units[0]);
	},
};
