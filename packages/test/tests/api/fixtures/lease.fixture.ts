import * as R from 'remeda';

import { leaseFactory } from '@self/seed';
import { FIELDS } from '@self/utils';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';
import type { Lease } from '@prisma/client';

export const leaseFixtures: AllFixtures = {
	leasesParams: [undefined, { option: true }],

	leases: async ({ org, unit, tenant, leasesParams }, use) => {
		const params = leasesParams ?? [{}];

		// Merge any declared params with the default params

		const leases = R.times(params.length, (n) => {
			const data = leaseFactory.build({
				organizationId: unit.organizationId,
				portfolioId: unit.portfolioId,
				unitId: unit.id,
				tenantId: tenant.id,
				...params[n],
			});

			data.start &&= new Date(data.start).toISOString();
			data.end &&= new Date(data.end).toISOString();

			return data;
		});

		// Insert leases

		await prisma.lease.createMany({
			data: leases.map(
				R.pick([
					...FIELDS.lease.all,
					'organizationId',
					'portfolioId',
					'unitId',
				]),
			),
		});

		const created = await prisma.lease.findMany({
			where: { organizationId: org.organization.id },
		});

		await use(created as [Lease, ...Lease[]]);
	},

	lease: async ({ leases }, use) => {
		await use(leases[0]);
	},
};
