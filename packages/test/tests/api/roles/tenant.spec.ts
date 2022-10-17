import { expect } from '@playwright/test';
import { roleFactory } from '@self/seed';
import * as R from 'remeda';
import type { PaginatedRoleDto } from '../../../types/api';
import { test } from '../api-fixtures';

test('tenant role', async ({ request, org, tenant }) => {
	const role = R.pick(
		roleFactory.build({
			organizationId: org.organization.id,
			tenantId: tenant.id,
			roleType: 'TENANT',
		}),
		['organizationId', 'roleType', 'tenantId', 'email'],
	);

	await request.post(`/roles`, { data: role });

	const res = await request.get(`/tenants/${tenant.id}/roles`);

	expect.soft(res.status()).toBe(200);

	const body = (await res.json()) as PaginatedRoleDto;

	expect.soft(body.results.length).toBe(1);

	body.results.forEach((role) => {
		expect.soft(role).toMatchObject({
			organizationId: org.organization.id,
			roleType: 'TENANT',
			portfolioId: null,
			tenantId: tenant.id,
		});
	});
});
