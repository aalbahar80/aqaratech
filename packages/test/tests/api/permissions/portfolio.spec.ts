import { expect } from '@playwright/test';
import { test } from '../api-fixtures';

test.use({
	userRoleType: 'PORTFOLIO',
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
	// "/search",
];

// check all accessible routes
for (const route of accessible) {
	test(`should be able to get ${route}`, async ({ scopedRequest }) => {
		const res = await scopedRequest.get(route);
		await expect(res).toBeOK();
	});
}

// check all not accessible routes
for (const route of notAccessible) {
	test(`should not be able to get ${route}`, async ({ scopedRequest }) => {
		const res = await scopedRequest.get(route, {});
		expect(res.status()).toBe(403);
	});
}

test('can get files from "/files"', async ({ portfolio, scopedRequest }) => {
	const res = await scopedRequest.get('/files', {
		params: {
			relationKey: 'portfolio',
			relationValue: portfolio.id,
		},
	});
	await expect(res).toBeOK();
});
