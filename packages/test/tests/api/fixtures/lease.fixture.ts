import * as R from 'remeda';

import { leaseFactory } from '@self/seed';
import { FIELDS } from '@self/utils';


import { resCheck } from '../../../utils/res-check';

import { apiURL } from './api-url';

import type { LeaseDto } from '../../../types/api';
import type { AllFixtures } from './test-fixtures.interface';

export const leaseFixtures: AllFixtures = {
	leasesParams: [undefined, { option: true }],

	leases: async ({ org, unit, tenant, request, leasesParams }, use) => {
		const params = leasesParams ?? [{}];

		// Merge any declared params with the default params

		const leases = R.times(params.length, (n) =>
			leaseFactory.build({
				organizationId: unit.organizationId,
				portfolioId: unit.portfolioId,
				unitId: unit.id,
				tenantId: tenant.id,
				...params[n],
			}),
		);

		// Insert leases

		const url = `${apiURL}/organizations/${org.organization.id}/leases`;

		const created = (await Promise.all(
			leases.map(async (lease) => {
				const picked = R.pick(lease, [
					...FIELDS.lease.all,
					'portfolioId',
					'unitId',
				]);

				const res = await request.post(url, { data: picked });
				resCheck(res);

				return (await res.json()) as LeaseDto;
			}),
		)) as [LeaseDto, ...LeaseDto[]];

		await use(created);
	},

	lease: async ({ leases }, use) => {
		await use(leases[0]);
	},
};
