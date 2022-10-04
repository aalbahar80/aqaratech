import { expect } from '@playwright/test';
import { testPortfolioId, testTenantRoleId } from '@self/seed';
import { test } from '../api-fixtures';

test.use({
	withRole: testTenantRoleId,
});

const accessible = ['/leases', '/leaseInvoices'];
const notAccessible = [
	'/portfolios',
	'/properties',
	'/units',
	'/expenses',
	'/aggregate/incomeByMonth',
	'/aggregate/expensesByMonth',
	// "/search",
];

// check all accessible routes
for (const route of accessible) {
	test(`should be able to get ${route}`, async ({ request }) => {
		const res = await request.get(route);
		await expect(res).toBeOK();
	});
}

// check all not accessible routes
for (const route of notAccessible) {
	test(`should not be able to get ${route}`, async ({ request }) => {
		const res = await request.get(route);
		expect(res.status()).toBe(403);
	});
}

test('can only get self from /tenants', async ({ request }) => {
	const res = await request.get('/tenants');
	const body = await res.json();
	expect(body.results.length).toBe(1);
});

test('cannot get files from "/files"', async ({ request }) => {
	const res = await request.get('/files', {
		params: {
			relationKey: 'portfolio',
			relationValue: testPortfolioId,
			// relationKey: "tenant",
			// relationValue: testTenantId,
		},
	});
	expect(res.status()).toBe(403);
});
