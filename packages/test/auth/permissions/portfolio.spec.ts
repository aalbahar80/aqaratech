import { expect, test } from "@playwright/test";
import { testPortfolioRoleId } from "@self/seed";
import { cookies } from "../../storageState.json";

const TOKEN = cookies.find((c) => c.name === "accessToken").value;

test.use({
	baseURL: "http://localhost:3002",
	extraHTTPHeaders: {
		Authorization: `Bearer ${TOKEN}`,
		"x-role-id": testPortfolioRoleId,
	},
});

const notAccessible = ["/organizations"];
const accessible = [
	"/users",
	"/organizations",
	"/tenants",
	"/portfolios",
	"/properties",
	"/units",
	"/leases",
	"/leaseInvoices",
	"/expenses",
	"/aggregate",
	"/search",
	"/files",
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
		await expect(res).not.toBeOK();
	});
}
