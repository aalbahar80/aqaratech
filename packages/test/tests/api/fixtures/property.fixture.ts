import * as R from 'remeda';

import { propertyFactory } from '@self/seed';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';

export const propertyFixtures: AllFixtures = {
	propertiesParams: [undefined, { option: true }],

	properties: async ({ org, portfolio, propertiesParams }, use) => {
		const params = propertiesParams ?? [{}];

		// Merge any declared params with the default params

		const properties = R.times(params.length, (n) =>
			propertyFactory.build({
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
				...params[n],
			}),
		);

		// Insert properties

		await prisma.property.createMany({
			data: properties.map(
				R.pick([
					'organizationId',
					'portfolioId',
					'area',
					'block',
					'street',
					'number',
				]),
			),
		});

		const created = await prisma.property.findMany({
			where: { organizationId: org.organization.id },
		});

		await use(created);
	},

	property: async ({ properties }, use) => {
		await use(properties[0]);
	},
};
