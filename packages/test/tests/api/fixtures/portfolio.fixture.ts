import * as R from 'remeda';

import { portfolioFactory } from '@self/seed';


import { resCheck } from '../../../utils/res-check';

import { apiURL } from './api-url';

import type { PortfolioDto } from '../../../types/api';
import type { AllFixtures } from './test-fixtures.interface';

export const portfolioFixtures: AllFixtures = {
	portfoliosParams: [undefined, { option: true }],

	portfolios: async ({ org, request, portfoliosParams }, use) => {
		const params = portfoliosParams ?? [{}];

		// Merge any declared params with the default params

		const portfolios = R.times(params.length, (n) => {
			return portfolioFactory.build({
				organizationId: org.organization.id,
				...params[n],
			});
		});

		// Insert portfolios

		const url = `${apiURL}/organizations/${org.organization.id}/portfolios`;

		const created = (await Promise.all(
			portfolios.map(async (portfolio) => {
				const picked = R.pick(portfolio, [
					'fullName',
					'label',
					'civilid',
					'phone',
					'dob',
				]);

				const res = await request.post(url, { data: picked });
				resCheck(res);

				return (await res.json()) as PortfolioDto;
			}),
		)) as [PortfolioDto, ...PortfolioDto[]];

		await use(created);
	},

	portfolio: async ({ portfolios }, use) => {
		await use(portfolios[0]);
	},
};
