import { expect } from '@playwright/test';
import { roleFactory } from '@self/seed';
import * as R from 'remeda';
import type { PaginatedRoleDto } from '../../../types/api';
import { test } from '../api-fixtures';

test('porfolio role', async ({ request, org, portfolio }) => {
	const role = R.pick(
		roleFactory.build({
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
			roleType: 'PORTFOLIO',
		}),
		['organizationId', 'roleType', 'portfolioId', 'email'],
	);

	await request.post(`/roles`, { data: role });

	const res = await request.get(`/portfolios/${portfolio.id}/roles`);

	expect.soft(res.status()).toBe(200);

	const body = (await res.json()) as PaginatedRoleDto;

	expect.soft(body.results.length).toBe(1);

	body.results.forEach((role) => {
		expect.soft(role).toMatchObject({
			organizationId: org.organization.id,
			roleType: 'PORTFOLIO',
			portfolioId: portfolio.id,
			tenantId: null,
		});
	});
});
