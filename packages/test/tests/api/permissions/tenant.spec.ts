import { expect } from '@playwright/test';

import { getUrl } from '../../../utils/post-url';
import { test } from '../api-fixtures';
import { apiURL } from '../fixtures/api-url';

import type { PaginatedTenantDto } from '../../../types/api';

test.use({
	userRoleType: 'TENANT',
});

const accessible = ['/leases'];
const notAccessible = [
	'/portfolios',
	'/properties',
	// '/units',
	// "/search",
];

// check all accessible routes
for (const route of accessible) {
	test(`should be able to get ${route}`, async ({ scopedRequest }) => {
		const res = await scopedRequest.get(route);

		await expect(res).toBeOK();
	});
}

test('can get own invoices', async ({ tenant, scopedRequest }) => {
	const res = await scopedRequest.get(`/tenants/${tenant.id}/leaseInvoices`);

	await expect(res).toBeOK();
});

test('can get leases invoices', async ({ lease, scopedRequest }) => {
	const res = await scopedRequest.get(`/leases/${lease.id}/leaseInvoices`);

	await expect(res).toBeOK();
});

// check all not accessible routes
for (const route of notAccessible) {
	test(`should not be able to get ${route}`, async ({ scopedRequest }) => {
		const res = await scopedRequest.get(route);

		expect(res.status()).toBe(403);
	});
}

test('can only get self from /tenants', async ({ scopedRequest }) => {
	const res = await scopedRequest.get('/tenants');

	const body = (await res.json()) as PaginatedTenantDto;

	expect(body.results.length).toBe(1);
});

test('cannot get data from /aggregate', async ({
	portfolio,
	scopedRequest,
}) => {
	const base = getUrl({
		organizationId: portfolio.organizationId,
		portfolioId: portfolio.id,
	});

	const urls = [base.incomeAggregate, base.expensesAggregate];

	for (const url of urls) {
		const res = await scopedRequest.get(url);

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(403);
	}
});

test('cannot get files from "/files"', async ({ tenant, scopedRequest }) => {
	const res = await scopedRequest.get('/files', {
		params: {
			relationKey: 'tenant',
			relationValue: tenant.id,
		},
	});
	expect(res.status()).toBe(403);
});

const scoped = ['/leaseInvoices', '/expenses'];

for (const route of scoped) {
	test(`cannot get ${route} `, async ({ portfolio, scopedRequest }) => {
		const url = `${apiURL}/portfolios/${portfolio.id}${route}`;

		const res = await scopedRequest.get(url);

		await expect.soft(res).not.toBeOK();

		expect(res.status()).toBe(403);
	});
}

test('cannot get /files', async ({ portfolio, scopedRequest }) => {
	const res = await scopedRequest.get('/files', {
		params: {
			relationKey: 'portfolio',
			relationValue: portfolio.id,
		},
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

const units = ['/units', '/units-minimal'];

for (const route of units) {
	test(`can get units: ${route}`, async ({ portfolio, scopedRequest }) => {
		const url = `/portfolios/${portfolio.id}${route}`;

		const res = await scopedRequest.get(url);

		await expect(res).not.toBeOK();
		expect(res.status()).toBe(403);
	});
}
