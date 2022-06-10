import { expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import { test } from '../../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.use({ storageState: path.resolve(__dirname, '../../adminState.json') });

test.setTimeout(15000);
test('expense is included in start range', async ({ page }) => {
	const randomAmount = Math.floor(Math.random() * 100);
	await page.goto('/new/expenses');

	await page.locator('input[name="amount"]').fill(randomAmount.toString());
	await page.locator('input[name="postAt"]').fill('2019-01-01');
	await page.selectOption('#categoryId', { index: 1 });
	await page.locator('input[name="memo"]').fill('some memo here');
	await page.selectOption('#portfolioId', { index: 0 });
	await page.selectOption('#propertyId', { index: 0 });
	await page.selectOption('#unitId', { index: 0 });
	await page.locator('div[role="radio"]:has-text("Property")').click();
	await Promise.all([
		page.waitForNavigation(),
		page.locator('text=Create new').click(),
	]);
	const url = page.url();

	await Promise.all([
		page.waitForNavigation(),
		page.locator('text=Property').click(),
	]);

	await page.locator('[aria-label="Breadcrumb"] >> text=Portfolio').click();
	await page.locator('text=Dashboard').click();
	await page.locator('input[name="start"]').fill('2019-01-01');
	await page.locator('input[name="end"]').fill('2019-01-31');
	await page.locator('button:below(:text("Expenses"))').first().click();

	const amountCell = page
		.locator(`text=KWD ${randomAmount.toString()}`)
		.first();
	await expect.soft(amountCell).toContainText(`KWD ${randomAmount.toString()}`);

	const [page1] = await Promise.all([
		page.waitForEvent('popup'),
		page
			.locator(`a:right-of(:text("KWD ${randomAmount.toString()}"))`)
			.first()
			.click(),
	]);
	await expect.soft(page1).toHaveURL(url);
});
