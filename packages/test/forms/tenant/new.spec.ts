import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { test } from '../../config';

test('smoke', async ({ page }, info) => {
	await page.goto('/tenants/new');

	await page.locator('input[name="fullName"]').fill('Example Tenant');
	await page.locator('input[name="label"]').fill('ET');
	await page.locator('input[name="phone"]').fill('91234567');
	await page.locator('input[name="civilid"]').fill('123456789012');
	await page.locator('input[name="dob"]').fill('2022-08-05');
	await page.locator('input[name="passportNum"]').fill('1234567');
	await page.locator('input[name="residencyNum"]').fill('12345');
	await page.locator('input[name="residencyEnd"]').fill('2022-01-01');
	await page.locator('#nationality').click();
	await page.locator(`data-testid=EGY`).click();

	await page.locator('text=Save').click();

	const id = new RegExp(
		`/tenants/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
	);
	await expect(page).toHaveURL(id);
	const url = page.url();

	// take screenshot
	info.snapshotDir;

	expect(page.locator('text=Tenant')).toBeTruthy();
	await page.locator('#detailsPane').screenshot({
		path:
			info.snapshotDir +
			`/tenant-${info.snapshotSuffix}-${info.project.name}.png`,
	});

	await page.locator('text=Edit').click();
	const edit = new RegExp(
		`/tenants/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/edit`,
	);
	await expect(page).toHaveURL(edit);
	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	// match screenshot
	expect(page.locator('text=Tenant')).toBeTruthy();
	expect(await page.locator('#detailsPane').screenshot()).toMatchSnapshot({
		name: 'tenant.png',
	});
});
