import { expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { test } from '../../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.use({ storageState: path.resolve(__dirname, '../../adminState.json') });

// test.setTimeout(10000);
test('expense is shown in range', async ({ page }) => {
	await page.goto('/new/expenses');

	await page.locator('input[name="amount"]').fill('9988');
	await page.locator('input[name="postAt"]').fill('2019-01-01');
	await page.selectOption('#categoryId', { index: 0 });
	await page.locator('input[name="memo"]').fill('some memo here');
	await page.selectOption('#portfolioId', { index: 0 });
	await page.selectOption('#propertyId', { index: 0 });
	await page.selectOption('#unitId', { index: 0 });
	await page.locator('div[role="radio"]:has-text("Property")').click();
	await Promise.all([
		page.waitForNavigation(/*{ url: 'http://localhost:3000/expenses/3e750e8d-7c45-4fa7-83a0-97ba74a214b9' }*/),
		page.locator('text=Create new').click(),
	]);
	// get current url
	// const url = await page.evaluate(() => window.location.href);
	const url = page.url;
	// await page

	// Click text=Property
	await Promise.all([
		page.waitForNavigation(/*{ url: 'http://localhost:3000/properties/e6018941-1554-43ee-9a7f-71797658a84e' }*/),
		page.locator('text=Property').click(),
	]);

	// Click text=Property
	// await page.locator('text=Property').click();

	// Click [aria-label="Breadcrumb"] >> text=Portfolio
	await page.locator('[aria-label="Breadcrumb"] >> text=Portfolio').click();
	// await expect(page).toHaveURL(
	// 'http://localhost:3000/portfolios/6479d13a-1c67-459f-bdcf-de093ef27f08',
	// );

	// Click text=Dashboard
	await Promise.all([
		page.waitForNavigation(/*{ url: 'http://localhost:3000/portfolios/6479d13a-1c67-459f-bdcf-de093ef27f08/dashboard' }*/),
		page.locator('text=Dashboard').click(),
	]);

	await page.locator('input[name="start"]').fill('2019-01-01');
	await page.locator('input[name="end"]').fill('2019-01-31');
	await page.locator('button:has-text("Data")').nth(1).click();

	const amount = await page.locator('text=KWD 9,988');
	await expect.soft(amount).toContainText('KWD 9,988');

	const [page1] = await Promise.all([
		page.waitForEvent('popup'),
		page.waitForNavigation(/*{ url: 'http://localhost:3000/expenses/3e750e8d-7c45-4fa7-83a0-97ba74a214b9' }*/),
		page
			.locator(
				'text=Jan 01, 19Management FeesKWD 9,988السالمية ق 11 م 3View >> a',
			)
			.click(),
	]);
	await expect.soft(page1).toHaveURL(url);
});
