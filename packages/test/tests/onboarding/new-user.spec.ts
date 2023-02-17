import path from 'path';

import { expect, test } from '@playwright/test';

import { globalStoragePath } from '../../utils/global-storage-path';
import { testUsers } from '../api/fixtures/users/test-users';

// "New user" is a user that is logging in for the first time.

const file = testUsers.freshUser.storageStateFilename;
const storagePath = path.join(globalStoragePath, file);

test.use({ storageState: storagePath });

test.describe('new user', () => {
	test('is redirected to /welcome if no role', async ({ page }) => {
		await page.goto('/');

		await page
			.getByRole('banner', { name: 'Global' })
			.getByRole('link', { name: 'Log in' })
			.click();

		await expect(page).toHaveURL('/en/welcome');
	});

	test('is redirected to /welcome if no role (hero)', async ({ page }) => {
		await page.goto('/');

		await page
			.getByTestId('hero')
			.getByRole('link', { name: 'Log in' })
			.click();

		await expect(page).toHaveURL('/en/welcome');
	});

	test.fixme('is redirected to portfolio portal if portolio', async () => {});

	test.fixme('is redirected to tenant portal if tenant', async () => {});
});
