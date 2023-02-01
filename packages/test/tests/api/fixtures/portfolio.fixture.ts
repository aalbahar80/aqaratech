import * as R from 'remeda';

import { portfolioFactory } from '@self/seed';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';
import type { Portfolio } from '@prisma/client';

export const portfolioFixtures: AllFixtures = {
	portfoliosParams: [undefined, { option: true }],

	portfolios: async ({ org, portfoliosParams }, use) => {
		const params = portfoliosParams ?? [{}];

		// Merge any declared params with the default params

		const portfolios = R.times(params.length, (n) => {
			const data = portfolioFactory.build({
				organizationId: org.organization.id,
				...params[n],
			});

			data.dob &&= new Date(data.dob).toISOString();

			return data;
		});

		// Insert portfolios

		await prisma.portfolio.createMany({ data: portfolios });

		const created = await prisma.portfolio.findMany({
			where: { organizationId: org.organization.id },
		});

		await use(created as [Portfolio, ...Portfolio[]]);
	},

	portfolio: async ({ portfolios }, use) => {
		await use(portfolios[0]);
	},
};
