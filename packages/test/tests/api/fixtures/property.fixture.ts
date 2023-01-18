import * as R from 'remeda';

import { propertyFactory } from '@self/seed';

import { resCheck } from '../../../utils/res-check';

import { apiURL } from './api-url';

import type { AllFixtures } from './test-fixtures.interface';
import type { PropertyDto } from '../../../types/api';

export const propertyFixtures: AllFixtures = {
	propertiesParams: [undefined, { option: true }],

	properties: async ({ org, portfolio, request, propertiesParams }, use) => {
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

		const url = `${apiURL}/organizations/${org.organization.id}/properties`;

		const created = (await Promise.all(
			properties.map(async (property) => {
				const picked = R.pick(property, [
					'portfolioId',
					'area',
					'block',
					'street',
					'number',
				]);

				const res = await request.post(url, { data: picked });
				resCheck(res);

				return (await res.json()) as PropertyDto;
			}),
		)) as [PropertyDto, ...PropertyDto[]];

		await use(created);
	},

	property: async ({ properties }, use) => {
		await use(properties[0]);
	},
};
