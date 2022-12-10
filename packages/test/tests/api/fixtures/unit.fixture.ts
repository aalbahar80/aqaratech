import * as R from 'remeda';

import { unitFactory } from '@self/seed';

import { resCheck } from '../../../utils/res-check';

import { apiURL } from './api-url';

import type { UnitDto } from '../../../types/api';
import type { AllFixtures } from './test-fixtures.interface';

export const unitFixtures: AllFixtures = {
	unitsParams: [undefined, { option: true }],

	units: async ({ org, properties, request, unitsParams }, use) => {
		const params = unitsParams ?? [{}];

		// Merge any declared params with the default params

		const units = R.times(params.length, (n) => {
			const property = properties[n % properties.length]!;
			return unitFactory.build({
				organizationId: org.organization.id,
				portfolioId: property.portfolioId,
				propertyId: property.id,
				...params[n],
			});
		});

		// Insert units

		const url = `${apiURL}/organizations/${org.organization.id}/units`;

		const created = (await Promise.all(
			units.map(async (unit) => {
				const picked = R.pick(unit, [
					'type',
					'unitNumber',
					'portfolioId',
					'propertyId',
				]);

				const res = await request.post(url, { data: picked });
				resCheck(res);

				return (await res.json()) as UnitDto;
			}),
		)) as [UnitDto, ...UnitDto[]];

		await use(created);
	},

	unit: async ({ units }, use) => {
		await use(units[0]);
	},
};
