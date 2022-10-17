import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { test } from '../../../config';

test('smoke', async ({ page }, info) => {
	const portfolio = sample.portfolios[0];
	const property = sample.properties[0];
	const unit = sample.units[0];

	await page.goto(`/expenses/new`);

	await page.locator('#portfolioId').click();
	await page.locator(`text=${portfolio.label}`).click();

	await page.locator('#propertyId').click();
	await page.locator(`data-testid=${property.id}`).click();

	await page.locator('#unitId').click();
	await page.locator(`data-testid=${unit.id}`).click();

	await page.locator('input[name="amount"]').fill('500');
	await page.fill('input[name="postAt"]', '2022-01-01');

	await page.locator('text=Save').click();

	const id = new RegExp(
		`/expenses/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
	);
	await expect(page).toHaveURL(id);
	const url = page.url();

	// take screenshot
	expect(page.locator('text=expense')).toBeTruthy();
	await page.locator('#detailsPane').screenshot({
		path: info.snapshotDir + `/expense-${info.snapshotSuffix}.png`,
	});

	await page.locator('text=Edit').click();
	const edit = new RegExp(
		`/expenses/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/edit`,
	);
	await expect(page).toHaveURL(edit);
	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	// match screenshot
	expect(page.locator('text=expense')).toBeTruthy();
	expect(await page.locator('#detailsPane').screenshot()).toMatchSnapshot({
		name: 'expense.png',
	});
});
