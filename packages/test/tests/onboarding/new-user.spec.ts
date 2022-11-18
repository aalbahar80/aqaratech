import { expect, test } from '@playwright/test';
import { testUsers } from '../api/fixtures/users/test-users';

// Setting storageState should be enough to re-use auth state. However, this is
// not working at the moment.
test.use({
	storageState: testUsers.freshUser.storageStatePath,
	// ignoreHTTPSErrors: true,
	// bypassCSP: true,
	// baseURL: process.env.PUBLIC_SITE_URL,
	// page: async ({ browser }, use) => {
	// 	// Create a new incognito browser context.
	// 	const context = await browser.newContext({
	// 		storageState: testUsers.freshUser.storageStatePath,
	// 	});

	// 	// Create a new page in a pristine context.
	// 	const page = await context.newPage();

	// 	// Use fixture
	// 	await use(page);

	// 	// Gracefully close the context we created
	// 	await context.close();
	// },
});

test('new users are redirected to /welcome', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Log in' }).click();
	await expect(page).toHaveURL('/welcome');
});
