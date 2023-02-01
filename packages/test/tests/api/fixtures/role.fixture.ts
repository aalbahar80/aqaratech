import * as R from 'remeda';

import { roleFactory } from '@self/seed';

import { prisma } from '../../../prisma';

import type { AllFixtures } from './test-fixtures.interface';
import type { Prisma, Role } from '@prisma/client';

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
			const data: Prisma.RoleCreateInput = {
				user: {
					connectOrCreate: {
						where: { email: r.email },
						create: { email: r.email },
					},
				},
				organization: { connect: { id: r.organizationId } },
				roleType: r.roleType,
			};

			if (r.portfolioId && r.roleType === 'PORTFOLIO') {
				data.portfolio = { connect: { id: r.portfolioId } };
			} else if (r.tenantId && r.roleType === 'TENANT') {
				data.tenant = { connect: { id: r.tenantId } };
			}

			await prisma.role.create({ data });
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
