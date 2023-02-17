import path from 'path';

import { expect, test } from '@playwright/test';

import { globalStoragePath } from '../../utils/global-storage-path';
import { testUsers } from '../api/fixtures/users/test-users';

// "New user" is a user that is logging in for the first time.

const file = testUsers.freshUser.storageStateFilename;
const storagePath = path.join(globalStoragePath, file);

test.use({ storageState: storagePath });

// TODO: Clicking the "Log in" link in the header is erroneously
// redirecting to login instead of welcome. This is a bug.
// `concierge` is correctly redirecting to welcome.
// Find out they're different and fix the bug.
test.fixme('new users are redirected to /welcome', async ({ page }) => {
	await page.goto('/');

	await page
		.getByRole('banner', { name: 'Global' })
		.getByRole('link', { name: 'Log in' })
		.click();

	await expect(page).toHaveURL('/en/welcome');
});

test.fixme('new users are redirected to /welcome - hero', async ({ page }) => {
	await page.goto('/');

	await page.getByTestId('hero').getByRole('link', { name: 'Log in' }).click();

	await expect(page).toHaveURL('/en/welcome');
});

test.describe.fixme('new user', () => {
	// TODO: move tests from above into this describe block
	test('is redirected to new org form if no role', async ({ page }) => {});
	test('is redirected to portfolio portal if portolio', async ({ page }) => {});
	test('is redirected to tenant portal if tenant', async ({ page }) => {});
});
