import * as R from 'remeda';

import { roleFactory } from '@self/seed';

import { prisma } from '../../../prisma';
import { createRole } from '../../../utils/create-role';

import type { AllFixtures } from './test-fixtures.interface';
import type { Role } from '@prisma/client';

export const roleFixtures: AllFixtures = {
	rolesParams: [undefined, { option: true }],

	roles: async ({ org, portfolio, tenant, rolesParams }, use) => {
		const params = rolesParams ?? [{}];

		// Merge any declared params with the default params

		const roles = R.times(params.length, (n) => {
			return roleFactory.build({
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
				tenantId: tenant.id,
				...params[n],
			});
		});

		// Insert roles

		for (const r of roles) {
			await createRole(r);
		}

		const created = await prisma.role.findMany({
			where: { organizationId: org.organization.id },
		});

		await use(created as [Role, ...Role[]]);
	},

	role: async ({ roles }, use) => {
		await use(roles[0]);
	},
};
