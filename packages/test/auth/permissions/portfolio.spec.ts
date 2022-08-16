import { testPortfolioId, testPortfolioRoleId } from "@self/seed";
import { expect, test } from "../../token";

test.use({
	extraHTTPHeaders: {
		"x-role-id": testPortfolioRoleId,
	},
});

const notAccessible = ["/organizations", "/users"];
const accessible = [
	"/tenants",
	"/portfolios",
	"/properties",
	"/units",
	"/leases",
	"/leaseInvoices",
	"/expenses",
	"/aggregate/incomeByMonth",
	"/aggregate/expensesByMonth",
	// "/search",
];

// check all accessible routes
for (const route of accessible) {
	test(`should be able to get ${route}`, async ({ request, token }) => {
		const res = await request.get(route, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		await expect(res).toBeOK();
	});
}

// check all not accessible routes
for (const route of notAccessible) {
	test(`should not be able to get ${route}`, async ({ request, token }) => {
		const res = await request.get(route, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		await expect(res).not.toBeOK();
	});
}

test('can get files from "/files"', async ({ request, token }) => {
	const res = await request.get("/files", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			relationKey: "portfolio",
			relationValue: testPortfolioId,
		},
	});
	await expect(res).toBeOK();
});
