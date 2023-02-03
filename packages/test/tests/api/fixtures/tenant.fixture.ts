import * as R from 'remeda';

import { tenantFactory } from '@self/seed';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';
import type { Tenant } from '@prisma/client';

export const tenantFixtures: AllFixtures = {
	tenantsParams: [undefined, { option: true }],

	tenants: async ({ org, tenantsParams }, use) => {
		const params = tenantsParams ?? [{}];

		// Merge any declared params with the default params

		const tenants = R.times(params.length, (n) => {
			const data = tenantFactory.build({
				organizationId: org.organization.id,
				...params[n],
			});

			data.dob &&= new Date(data.dob).toISOString();
			data.residencyEnd &&= new Date(data.residencyEnd).toISOString();

			return data;
		});

		// Insert tenants

		await prisma.tenant.createMany({
			data: tenants,
		});

		const created = await prisma.tenant.findMany({
			where: {
				organizationId: org.organization.id,
			},
		});

		await use(created as [Tenant, ...Tenant[]]);
	},

	tenant: async ({ tenants }, use) => {
		await use(tenants[0]);
	},
};
