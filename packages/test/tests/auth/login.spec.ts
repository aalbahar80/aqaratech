import { expect } from '@playwright/test';
import { testOrgEmail, testPassword } from '@self/seed';
import { Cookie } from '@self/utils';
import { test as base } from '../api/api-fixtures';
import { siteURL } from '../api/fixtures/site-url';
import { LoginPage } from './login-page';

const user = {
	role: 'orgadmin',
	email: testOrgEmail,
	password: testPassword,
	destination: () => '/',
};

// const users = [
// 	{
// 		role: "portfolio",
// 		id: testPortfolioId,
// 		email: testPortfolioEmail,
// 		password: testPassword,
// 	destination: (id: string) => `/portfolios/${id}/financials/summary`,
// 	},
// 	{
// 		role: "tenant",
// 		id: testTenantId,
// 		email: testTenantEmail,
// 		password: testPassword,
// 		destination: `/portal/tenant/${testTenantId}`,
// 	},
// ] as const;

const test = base.extend({
	page: async ({ browser }, use) => {
		// Create a new incognito browser context.
		const context = await browser.newContext();
		await context.clearCookies();
		// Create a new page in a pristine context.
		const page = await context.newPage();

		// Login
		const { email, password } = user;

		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.fill({ email, password });

		// Use fixture
		await use(page);

		// Gracefully close the context we created
		await context.close();
	},
});

test('login', async ({ page }) => {
	const domain = new URL(siteURL).hostname;

	const cookies = await page.context().cookies();
	const accessToken = cookies.find((c) => c.name === Cookie.accessToken);

	const selectRolePage =
		/^users\/[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\/roles$/;

	const possibleDestinations = ['/', selectRolePage, user.destination()];

	// check that url is one of the possible destinations
	await expect(page).toHaveURL(RegExp(possibleDestinations.join('|')));

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
