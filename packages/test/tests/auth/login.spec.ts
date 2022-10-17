import { expect, Page, test as base } from '@playwright/test';
import { testOrgEmail, testPassword } from '@self/seed';
import { Cookie } from '@self/utils';

const user = {
	role: 'orgadmin',
	email: testOrgEmail,
	password: testPassword,
	destination: '/',
};

// const users = [
// 	{
// 		role: "portfolio",
// 		id: testPortfolioId,
// 		email: testPortfolioEmail,
// 		password: testPassword,
// 		// destination: /^http:\/\/localhost:3000\/portfolios\/.+\/dashboard$/,
// 		destination: `/portfolios/${testPortfolioId}/dashboard`,
// 	},
// 	{
// 		role: "tenant",
// 		id: testTenantId,
// 		email: testTenantEmail,
// 		password: testPassword,
// 		destination: `/portal/tenant/${testTenantId}`,
// 	},
// ] as const;

type MyFixtures = {
	page: Page;
};

const test = base.extend<MyFixtures>({
	page: async ({ browser }, use) => {
		// Create a new incognito browser context.
		const context = await browser.newContext();
		await context.clearCookies();
		// Create a new page in a pristine context.
		const page = await context.newPage();

		// Login
		await page.goto('/');
		await page.locator('text=Log In >> visible=true').click();

		await page.fill('input[name="username"]', user.email);
		await page.fill('input[name="password"]', user.password);
		await page.locator('button[name="action"]').click();

		// Use fixture
		await use(page);

		// Gracefully close the context we created
		await context.close();
	},
});

test('login', async ({ page, baseURL }) => {
	const domain = new URL(baseURL).hostname;

	const cookies = await page.context().cookies();
	const accessToken = cookies.find((c) => c.name === Cookie.accessToken);

	await expect.soft(page).toHaveURL(user.destination);

	const token = {
		value: expect.stringMatching(
			/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/,
		),
		domain,
		path: '/',
		expires: expect.any(Number),
		httpOnly: true,
		// sveltekit sets secure to true only in production
		// secure: true,
	};

	expect.soft(accessToken).toMatchObject({
		name: Cookie.accessToken,
		...token,
	});

	const idToken = cookies.find((c) => c.name === Cookie.idToken);

	expect.soft(idToken).toMatchObject({
		name: Cookie.idToken,
		...token,
	});
});
