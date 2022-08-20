import { sample, testOrgRoleId } from "@self/seed";
import { expect, test } from "../token";

test.use({
	extraHTTPHeaders: {
		"x-role-id": testOrgRoleId,
	},
});

const org = sample.organizations[0];
const portfolio = sample.portfolios[0];
const tenant = sample.tenants[0];

test("org roles", async ({ request, token }) => {
	const res = await request.get(`/organizations/${org.id}/roles`, {
		headers: { authorization: `Bearer ${token}` },
	});

	expect(res.status()).toBe(200);
	const body = await res.json();

	console.log({ res: body.results }, "find-roles.spec.ts ~ 22");
	const roleTypes: string[] = body.results.map(({ roleType }) => roleType);

	roleTypes.forEach((roleType) => {
		expect(roleType).toBe("ORGADMIN");
	});
});

// test("portfolio roles", async ({ request, token }) => {
// 	const res = await request.get(`/portfolios/${portfolio.id}/roles`, {
// 		headers: { authorization: `Bearer ${token}` },
// 	});

// 	expect(res.status()).toBe(200);
// 	const body = await res.json();

// 	expect(body.results).toEqual(
// 		expect.arrayContaining([expect.objectContaining({ roleType: "PORTFOLIO" })])
// 	);
// });

// test("tenant roles", async ({ request, token }) => {
// 	const res = await request.get(`/tenants/${tenant.id}/roles`, {
// 		headers: { authorization: `Bearer ${token}` },
// 	});

// 	expect(res.status()).toBe(200);
// 	const body = await res.json();

// 	expect(body.results).toEqual(
// 		expect.arrayContaining([expect.objectContaining({ roleType: "TENANT" })])
// 	);
// });
