import * as R from 'remeda';

import { tenantFactory } from '@self/seed';

import { resCheck } from '../../../utils/res-check';

import { apiURL } from './api-url';

import type { TenantDto } from '../../../types/api';
import type { AllFixtures } from './test-fixtures.interface';

export const tenantFixtures: AllFixtures = {
	tenantsParams: [undefined, { option: true }],

	tenants: async ({ org, request, tenantsParams }, use) => {
		const params = tenantsParams ?? [{}];

		// Merge any declared params with the default params

		const tenants = R.times(params.length, (n) =>
			tenantFactory.build({
				organizationId: org.organization.id,
				...params[n],
			}),
		);

		// Insert tenants

		const url = `${apiURL}/organizations/${org.organization.id}/tenants`;

		const created = (await Promise.all(
			tenants.map(async (tenant) => {
				const picked = R.pick(tenant, ['fullName']);

				const res = await request.post(url, { data: picked });
				resCheck(res);

				return (await res.json()) as TenantDto;
			}),
		)) as [TenantDto, ...TenantDto[]];

		await use(created);
	},

	tenant: async ({ tenants }, use) => {
		await use(tenants[0]);
	},
};
