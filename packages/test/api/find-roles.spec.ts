import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { test } from './api-config';

const org = sample.organizations[0];
const portfolio = sample.portfolios[0];
const tenant = sample.tenants[0];

test('org members', async ({ request }) => {
	const res = await request.get(`/organizations/${org.id}/roles`);

	expect(res.status()).toBe(200);
	const body = await res.json();

	body.results.forEach((role) => {
		expect(role).toMatchObject({
			organizationId: org.id,
			roleType: 'ORGADMIN',
			portfolioId: null,
			tenantId: null,
		});
	});
});

test('portfolio members', async ({ request }) => {
	const res = await request.get(`/portfolios/${portfolio.id}/roles`);

	expect(res.status()).toBe(200);
	const body = await res.json();

	body.results.forEach((role) => {
		expect(role).toMatchObject({
			organizationId: org.id,
			roleType: 'PORTFOLIO',
			portfolioId: portfolio.id,
			tenantId: null,
		});
	});
});

test('tenant members', async ({ request }) => {
	const res = await request.get(`/tenants/${tenant.id}/roles`);

	expect(res.status()).toBe(200);
	const body = await res.json();

	body.results.forEach((role) => {
		expect(role).toMatchObject({
			organizationId: org.id,
			roleType: 'TENANT',
			portfolioId: null,
			tenantId: tenant.id,
		});
	});
});
