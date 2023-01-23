import { expect, test } from '@playwright/test';

import { testUsers } from '../api/fixtures/users/test-users';
import { LoginPage } from '../auth/login-page';

const email = 'dev.tester.1@mailthink.net';
const password = 'cloud12';

// Setting storageState should be enough to re-use auth state. However, this is
// not working at the moment. So we manually login again for now.
test.use({
	storageState: testUsers.freshUser.storageStatePath,

	page: async ({ browser }, use) => {
		// Create a new incognito browser context.
		const context = await browser.newContext();
		await context.clearCookies();
		// Create a new page in a pristine context.
		const page = await context.newPage();

		// Login
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await loginPage.fill({ email, password });

		// Use fixture
		await use(page);

		// Gracefully close the context we created
		await context.close();
	},
});

test('new users are redirected to /welcome', async ({ page }) => {
	test.slow();

	await page.goto('/');

	await page
		.getByRole('banner', { name: 'Global' })
		.getByRole('link', { name: 'Log in' })
		.click();

	await expect(page).toHaveURL('/en/welcome');
});

test('new users are redirected to /welcome - hero', async ({ page }) => {
	test.slow();

	await page.goto('/');

	await page.getByTestId('hero').getByRole('link', { name: 'Log in' }).click();

	await expect(page).toHaveURL('/en/welcome');
});
