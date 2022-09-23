import { testPortfolioId, testTenantRoleId } from '@self/seed';
import { expect, test } from '../../token';

test.use({
	extraHTTPHeaders: {
		'x-role-id': testTenantRoleId,
	},
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
	test(`should be able to get ${route}`, async ({ request, token }) => {
		const res = await request.get(route, {
			headers: { Authorization: `Bearer ${token}` },
		});
		await expect(res).toBeOK();
	});
}

// check all not accessible routes
for (const route of notAccessible) {
	test(`should not be able to get ${route}`, async ({ request, token }) => {
		const res = await request.get(route, {
			headers: { Authorization: `Bearer ${token}` },
		});
		expect(res.status()).toBe(403);
	});
}

test('can only get self from /tenants', async ({ request, token }) => {
	const res = await request.get('/tenants', {
		headers: { Authorization: `Bearer ${token}` },
	});
	const body = await res.json();
	expect(body.results.length).toBe(1);
});

test('cannot get files from "/files"', async ({ request, token }) => {
	const res = await request.get('/files', {
		headers: { Authorization: `Bearer ${token}` },
		params: {
			relationKey: 'portfolio',
			relationValue: testPortfolioId,
			// relationKey: "tenant",
			// relationValue: testTenantId,
		},
	});
	expect(res.status()).toBe(403);
});
