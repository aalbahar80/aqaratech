import { expect, test } from '@playwright/test';
import { testUsers } from '../api/fixtures/users/test-users';

const email = 'dev.tester.1@mailthink.net';
const password = 'cloud12';

const user = { email, password };

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

test('new users are redirected to /welcome', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Log in' }).click();
	await expect(page).toHaveURL('/welcome');
});
