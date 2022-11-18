import { expect, test } from '@playwright/test';
import { testUsers } from '../api/fixtures/users/test-users';

test.use({
	storageState: testUsers.freshUser.storageStatePath,
});

test('new users are routes to /welcome', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Log in' }).click();
	await expect(page).toHaveURL('/welcome');
});
