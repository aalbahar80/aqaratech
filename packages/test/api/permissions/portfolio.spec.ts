import { expect } from '@playwright/test';
import { testPortfolioId, testPortfolioRoleId } from '@self/seed';
import { test } from '../api-fixtures';

test.use({
	withRole: testPortfolioRoleId,
});

const notAccessible: string[] = [];
const accessible = [
	'/tenants',
	'/portfolios',
	'/properties',
	'/units',
	'/leases',
	'/leaseInvoices',
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
		const res = await request.get(route, {});
		expect(res.status()).toBe(403);
	});
}

test('can get files from "/files"', async ({ request }) => {
	const res = await request.get('/files', {
		params: {
			relationKey: 'portfolio',
			relationValue: testPortfolioId,
		},
	});
	await expect(res).toBeOK();
});
