import * as R from 'remeda';

import { roleFactory } from '@self/seed';

import { PostUrlRole } from '../../../utils/post-url';
import { resCheck } from '../../../utils/res-check';

import type { AllFixtures } from './test-fixtures.interface';
import type { RoleDto } from '../../../types/api';

export const roleFixtures: AllFixtures = {
	rolesParams: [undefined, { option: true }],

	roles: async ({ org, portfolio, tenant, request, rolesParams }, use) => {
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

		const created = (await Promise.all(
			roles.map(async (role) => {
				const picked = R.pick(role, ['email']);

				const url = PostUrlRole({
					organizationId: role.organizationId,
					portfolioId: role.portfolioId,
					tenantId: role.tenantId,
				})[role.roleType];

				const res = await request.post(url, { data: picked });
				resCheck(res);

				return (await res.json()) as RoleDto;
			}),
		)) as [RoleDto, ...RoleDto[]];

		await use(created);
	},

	role: async ({ roles }, use) => {
		await use(roles[0]);
	},
};
