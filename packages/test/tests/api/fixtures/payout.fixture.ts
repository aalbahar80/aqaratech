import * as R from 'remeda';

import { payoutFactory } from '@self/seed';


import { resCheck } from '../../../utils/res-check';

import { apiURL } from './api-url';

import type { PayoutDto } from '../../../types/api';
import type { AllFixtures } from './test-fixtures.interface';

export const payoutFixtures: AllFixtures = {
	payoutsParams: [undefined, { option: true }],

	payouts: async ({ org, portfolio, request, payoutsParams }, use) => {
		const params = payoutsParams ?? [{}];

		// Merge any declared params with the default params

		const payouts = R.times(params.length, (n) =>
			payoutFactory.build({
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
				...params[n],
			}),
		);

		// Insert payouts

		const url = `${apiURL}/organizations/${org.organization.id}/payouts`;

		const created = (await Promise.all(
			payouts.map(async (payout) => {
				const picked = R.pick(payout, [
					'amount',
					'postAt',
					'memo',
					'portfolioId',
				]);

				const res = await request.post(url, { data: picked });
				resCheck(res);

				return (await res.json()) as PayoutDto;
			}),
		)) as [PayoutDto, ...PayoutDto[]];

		await use(created);
	},

	payout: async ({ payouts }, use) => {
		await use(payouts[0]);
	},
};
