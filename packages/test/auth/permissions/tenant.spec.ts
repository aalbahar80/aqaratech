import { testTenantRoleId } from "@self/seed";
import { expect, test } from "../../token";

test.use({
	extraHTTPHeaders: {
		"x-role-id": testTenantRoleId,
	},
});

const accessible = ["/leases", "/leaseInvoices"];
const notAccessible = [
	"/users",
	"/organizations",
	"/tenants",
	"/portfolios",
	"/properties",
	"/units",
	"/expenses",
	"/aggregate",
	"/search",
	"/files",
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
