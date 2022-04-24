import { test, expect } from '@playwright/test';

test.use({ storageState: './tests/config/adminStorageState.json' });

test('Admin can create a new client', async ({ page }) => {
	await page.goto('http://localhost:3000');

	await page.click('a:has-text("Clients")');
	await page.click('a:has-text("New")');

	await page.fill('input[name="firstName"]', 'Test Client');
	await page.fill('input[name="lastName"]', 'Test Client');
	await page.fill('input[name="email"]', 'a@example.com');
	await page.fill('input[name="phone"]', '12345678');
	// await page.pause();
	await page.fill('input[name="civilid"]', '123456789012');
	await page.fill('input[name="dob"]', '1990-05-28');

	await page.click('button[text="Create new"]');

	await expect(page).toHaveURL('^http://localhost:3000/clients/[0-9]+$');
});
