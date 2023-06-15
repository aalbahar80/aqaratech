import { expect } from '@playwright/test';
import { resolveURL } from 'ufo';

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
	'/maintenance-orders',
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
		const res = await request.get(
			resolveURL('organizations', portfolio.organizationId, 'files'),
			{
				params: {
					relationKey: 'portfolio',
					relationValue: portfolio.id,
				},
			},
		);

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

test('can get data from /aggregate/income with portfolioId', async ({
	portfolio,
	request,
}) => {
	const base = getUrl({
		organizationId: portfolio.organizationId,
	});

	const url = base.incomeAggregate;

	const res = await request.get(url, { params: { portfolioId: portfolio.id } });

	await expect(res).toBeOK();
});

test('cannot get data from /aggregate/income without portfolioId', async ({
	portfolio,
	request,
}) => {
	const base = getUrl({
		organizationId: portfolio.organizationId,
	});

	const url = base.incomeAggregate;

	const res = await request.get(url);

	await expect(res).not.toBeOK();
	expect(res.status()).toBe(403);
});

test('can get data from /aggregate/expenses', async ({
	portfolio,
	request,
}) => {
	const base = getUrl({
		organizationId: portfolio.organizationId,
		portfolioId: portfolio.id,
	});

	const url = base.expensesAggregate;

	const res = await request.get(url);

	await expect(res).toBeOK();
});

const units = ['/units', '/units-minimal'];

for (const route of units) {
	test(`can get units: ${route}`, async ({ portfolio, request }) => {
		const url = `/portfolios/${portfolio.id}${route}`;

		const res = await request.get(url);

		await expect(res).toBeOK();
	});
}
