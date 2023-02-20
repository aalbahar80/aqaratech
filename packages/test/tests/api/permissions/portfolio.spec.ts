import { expect } from '@playwright/test';

import { getUrl } from '../../../utils/post-url';
import { test } from '../api-fixtures';

test.use({
	userRoleType: 'PORTFOLIO',
});

const notAccessible: string[] = [];
const accessible = [
	'/tenants',
	'/portfolios',
	'/properties',
	'/leases',
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

test.describe('files', () => {
	test.use({
		createBucket: true,
	});

	test(`can get portfolio /files`, async ({ portfolio, request }) => {
		const res = await request.get('/files', {
			params: {
				relationKey: 'portfolio',
				relationValue: portfolio.id,
			},
		});

		await expect(res).toBeOK();
	});
});

const scoped = ['/leaseInvoices', '/expenses'];

for (const route of scoped) {
	test(`can get portfolio ${route} `, async ({ request, portfolio }) => {
		const url = `/portfolios/${portfolio.id}${route}`;

		const res = await request.get(url);

		await expect(res).toBeOK();
	});
}

test('can get data from /aggregate', async ({ portfolio, request }) => {
	const base = getUrl({
		organizationId: portfolio.organizationId,
		portfolioId: portfolio.id,
	});

	const urls = [base.incomeAggregate, base.expensesAggregate];

	for (const url of urls) {
		const res = await request.get(url);

		await expect(res).toBeOK();
	}
});

const units = ['/units', '/units-minimal'];

for (const route of units) {
	test(`can get units: ${route}`, async ({ portfolio, request }) => {
		const url = `/portfolios/${portfolio.id}${route}`;

		const res = await request.get(url);

		await expect(res).toBeOK();
	});
}
