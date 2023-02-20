import * as R from 'remeda';

import { payoutFactory } from '@self/seed';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';
import type { Payout } from '@prisma/client';

export const payoutFixtures: AllFixtures = {
	payoutsParams: [undefined, { option: true }],

	payouts: async ({ org, portfolio, payoutsParams }, use) => {
		const params = payoutsParams ?? [{}];

		// Merge any declared params with the default params

		const payouts = R.times(params.length, (n) => {
			const data = payoutFactory.build({
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
				...params[n],
			});

			data.postAt &&= new Date(data.postAt).toISOString();

			return data;
		});

		// Insert payouts

		await prisma.payout.createMany({
			data: payouts.map(
				R.pick(['organizationId', 'portfolioId', 'amount', 'postAt', 'memo']),
			),
		});

		const created = await prisma.payout.findMany({
			where: { organizationId: org.organization.id },
		});

		// @ts-expect-error test
		await use(created as [Payout, ...Payout[]]);
	},

	payout: async ({ payouts }, use) => {
		await use(payouts[0]);
	},
};
