import { expect, test } from '@playwright/test';

test('home page has title', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('h1')).toBe(
		'A better way to manage your properties',
	);
});
