import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { test } from '../../api/api-fixtures';

test('smoke', async ({ page }, info) => {
	await page.goto('/leases/new', { waitUntil: 'networkidle' });

	await page.locator('#tenantId').click();
	await page.locator(`text=${sample.tenants[0].label}`).click();

	await page.locator('#portfolioId').click();
	await page.locator(`text=${sample.portfolios[0].label}`).click();

	await page.locator('#propertyId').click();
	await page.locator(`data-testid=${sample.properties[0].id}`).click();

	await page.locator('#unitId').click();
	await page.locator(`data-testid=${sample.units[0].id}`).click();

	await page.locator('#monthlyRent').fill('100');
	await page.fill('input[name="start"]', '2022-01-01');
	await page.fill('input[name="end"]', '2022-12-31');

	await page.locator('text=Save').click();

	const id = new RegExp(
		`/leases/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
	);
	await expect(page).toHaveURL(id);
	const url = page.url();

	// take screenshot
	expect(page.locator('text=lease')).toBeTruthy();
	await page.locator('#detailsPane').screenshot({
		path: info.snapshotDir + `/lease-${info.snapshotSuffix}.png`,
	});

	await page.locator('text=Edit').click();
	const edit = new RegExp(
		`/leases/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/edit`,
	);
	await expect(page).toHaveURL(edit);
	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	// match screenshot
	expect(page.locator('text=lease')).toBeTruthy();
	expect(await page.locator('#detailsPane').screenshot()).toMatchSnapshot({
		name: 'lease.png',
	});
});
