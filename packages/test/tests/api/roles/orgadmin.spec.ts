import { expect } from '@playwright/test';
import { roleFactory } from '@self/seed';
import * as R from 'remeda';
import type { PaginatedRoleDto } from '../../../types/api';
import { test } from '../api-fixtures';

test('orgadmin role', async ({ request, org }) => {
	const role = R.pick(
		roleFactory.build({
			organizationId: org.organization.id,
		}),
		['organizationId', 'roleType', 'email'],
	);

	await request.post(`/roles`, { data: role });

	const res = await request.get(`/organizations/${org.organization.id}/roles`);

	expect.soft(res.status()).toBe(200);

	const body = (await res.json()) as PaginatedRoleDto;

	expect.soft(body.results.length).toBe(2); // 2 because the org creator is created by default

	body.results.forEach((role) => {
		expect.soft(role).toMatchObject({
			organizationId: org.organization.id,
			roleType: 'ORGADMIN',
			portfolioId: null,
			tenantId: null,
		});
	});
});
