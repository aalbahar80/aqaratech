import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { test } from '../../api/api-fixtures';

test('smoke', async ({ page }, info) => {
	await page.goto('/units/new');

	await page.locator('#portfolioId').click();
	await page.locator(`text=${sample.portfolios[0].label}`).click();

	await page.locator('#propertyId').click();
	await page.locator(`data-testid=${sample.properties[0].id}`).click();

	await page.locator('#unitNumber').fill('5');
	await page.selectOption('#type', { label: 'مخزن' });

	await page.locator('text=Save').click();

	const id = new RegExp(
		`/units/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
	);
	await expect(page).toHaveURL(id);
	const url = page.url();

	// take screenshot
	expect(page.locator('text=unit')).toBeTruthy();
	await page.locator('#detailsPane').screenshot({
		path:
			info.snapshotDir +
			`/unit-${info.snapshotSuffix}-${info.project.name}.png`,
	});

	await page.locator('text=Edit').click();
	const edit = new RegExp(
		`/units/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/edit`,
	);
	await expect(page).toHaveURL(edit);
	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	// match screenshot
	expect(page.locator('text=unit')).toBeTruthy();
	expect(await page.locator('#detailsPane').screenshot()).toMatchSnapshot({
		name: 'unit.png',
	});
});
