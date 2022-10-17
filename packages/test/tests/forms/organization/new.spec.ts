import { expect } from '@playwright/test';
import { test } from '../../../config';

test('existing user can create new org', async ({ page, isMobile }) => {
	await page.goto('/');

	// wait a bit for dropdown to load
	// await page.waitForLoadState('networkidle'); // otherwise flaky/no hydration
	if (isMobile) {
		await page.locator('button:has-text("Open main menu")').click();
	} else {
		await page.locator('data-testid=dropdown-menu').click();
	}

	await page.locator('text=Switch Role').click();
	await page.locator('text=Create new Organization').click();
	await expect(page).toHaveURL('/organizations/new');
	await page.waitForLoadState('networkidle'); // otherwise flaky/no hydration

	const { name, label } = getName();
	await page.locator('input[name="fullName"]').fill(name);
	await page.locator('input[name="label"]').fill(label);
	await page.locator('text=Save').click();

	const locator = page.locator(`text=${label}`);
	await expect(locator).toBeVisible();
});

test('can be submitted', async ({ page }) => {
	await page.goto('/organizations/new');

	const { name, label } = getName();
	await page.locator('input[name="fullName"]').fill(name);
	await page.locator('input[name="label"]').fill(label);
	await page.locator('text=Save').click();

	const locator = page.locator(`text=${label}`);
	await expect(locator).toBeVisible();
});

const getName = () => {
	const random = Math.random().toString(36).substring(7);
	return {
		name: `Test Organization ${random}`,
		label: `test-org-${random}`,
	};
};
