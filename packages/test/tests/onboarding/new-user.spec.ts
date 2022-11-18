import { test as base, expect } from '@playwright/test';

const email = 'dev.tester.1@mailthink.net';
const password = 'cloud12';

const user = { email, password };

const test = base.extend({
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

// test.beforeAll(async ({ browser }) => {

// });

test('new users are routes to /welcome', async ({ page }) => {
	await expect(page).toHaveURL('/welcome');
});
