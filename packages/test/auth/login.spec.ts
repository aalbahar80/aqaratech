import { expect, test } from "@playwright/test";
import {
	testOrgEmail,
	testPassword,
	testPortfolioEmail,
	testPortfolioId,
	testTenantEmail,
	testTenantId,
} from "@self/seed";

const users = [
	{
		role: "orgadmin",
		email: testOrgEmail,
		password: testPassword,
		destination: "/",
	},
	{
		role: "owner",
		id: testPortfolioId,
		email: testPortfolioEmail,
		password: testPassword,
		// destination: /^http:\/\/localhost:3000\/portfolios\/.+\/dashboard$/,
		destination: `/portfolios/${testPortfolioId}/dashboard`,
	},
	{
		role: "tenant",
		id: testTenantId,
		email: testTenantEmail,
		password: testPassword,
		destination: `/portal/tenant/${testTenantId}`,
	},
] as const;

for (const user of users) {
	test.describe(`${user.role} login:`, async () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/");
			await page.locator("text=Log In >> visible=true").click();

			await page.fill('input[name="username"]', user.email);
			await page.fill('input[name="password"]', user.password);
			await page.locator('button[name="action"]').click();
		});

		test(`redirected to correct url`, async ({ page }) => {
			await expect(page).toHaveURL(user.destination);
		});

		test("accessToken exists", async ({ context }) => {
			const cookies = await context.cookies();
			const accessToken = cookies.find((c) => c.name === "accessToken");
			expect(accessToken).toMatchObject({
				name: "accessToken",
				value: expect.stringMatching(
					/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/
				),
				domain: "localhost",
				path: "/",
				expires: expect.any(Number),
				httpOnly: true,
				secure: true,
			});
		});

		test("idToken exists", async ({ context }) => {
			const cookies = await context.cookies();
			const idToken = cookies.find((c) => c.name === "idToken");
			expect(idToken).toMatchObject({
				name: "idToken",
				value: expect.stringMatching(
					/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/
				),
				domain: "localhost",
				path: "/",
				expires: expect.any(Number),
				httpOnly: true,
				secure: true,
			});
		});
	});
}
