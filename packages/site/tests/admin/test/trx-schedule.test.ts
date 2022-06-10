import { expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { test } from '../../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.use({ storageState: path.resolve(__dirname, '../../adminState.json') });
test('Lease transactions have correct dates', async ({ page }) => {
	await page.goto('/leases');

	// grab an existing lease to avoid creating tenants/portfolios/properties/units
	await page.locator('text=Expiry').first().click();
	await page.locator('text=Renew').click();

	await page.locator('input[name="start"]').fill('2022-07-01');
	await page.locator('input[name="end"]').fill('2023-07-01');
	await page.locator('input[name="monthlyRent"]').fill('555');
	await page.locator('#count').fill('12');
	await Promise.all([
		page.waitForNavigation(),
		page.locator('button:has-text("Create new")').click(),
	]);

	const table = page.locator('table');
	await expect(table).toContainText('Rent for: July 2022');
	await expect(table).toContainText('Rent for: August 2022');
	await expect(table).toContainText('Rent for: September 2022');
	await expect(table).toContainText('Rent for: October 2022');
	await expect(table).toContainText('Rent for: November 2022');
	await expect(table).toContainText('Rent for: December 2022');
	await expect(table).toContainText('Rent for: January 2023');
	await expect(table).toContainText('Rent for: February 2023');
	await expect(table).toContainText('Rent for: March 2023');
	await expect(table).toContainText('Rent for: April 2023');
	await expect(table).toContainText('Rent for: May 2023');
	await expect(table).toContainText('Rent for: June 2023');

	await expect(table).toContainText('Jul 01, 22');
	await expect(table).toContainText('Aug 01, 22');
	await expect(table).toContainText('Sep 01, 22');
	await expect(table).toContainText('Oct 01, 22');
	await expect(table).toContainText('Nov 01, 22');
	await expect(table).toContainText('Dec 01, 22');
	await expect(table).toContainText('Jan 01, 23');
	await expect(table).toContainText('Feb 01, 23');
	await expect(table).toContainText('Mar 01, 23');
	await expect(table).toContainText('Apr 01, 23');
	await expect(table).toContainText('May 01, 23');
	await expect(table).toContainText('Jun 01, 23');

	await expect(table).not.toContainText('Jun 30, 22');
	await expect(table).not.toContainText('Jul 02, 22');
	await expect(table).not.toContainText('Jul 30, 22');
	await expect(table).not.toContainText('Jul 31, 22');
});
