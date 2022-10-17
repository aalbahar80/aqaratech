import { expect } from '@playwright/test';
import { test } from '../../../config';

test('smoke', async ({ page }, info) => {
	await page.goto('/portfolios/new', { waitUntil: 'networkidle' });

	await page.locator('input[name="fullName"]').click();
	await page.locator('input[name="fullName"]').fill('John Doe');

	await page.locator('input[name="label"]').click();
	await page.locator('input[name="label"]').fill('JD');

	await page.locator('input[name="phone"]').click();
	await page.locator('input[name="phone"]').fill('91234567');

	await page.locator('input[name="civilid"]').click();
	await page.locator('input[name="civilid"]').fill('123456789012');

	await page.locator('input[name="dob"]').fill('2022-08-05');

	await page.locator('text=Save').click();

	const id = new RegExp(
		`/portfolios/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
	);
	await expect(page).toHaveURL(id);
	const url = page.url();

	// take screenshot
	info.snapshotDir;

	expect(page.locator('text=Portfolio')).toBeTruthy();
	await page.locator('#detailsPane').screenshot({
		path:
			info.snapshotDir +
			`/portfolio-${info.snapshotSuffix}-${info.project.name}.png`,
	});

	await page.locator('text=Edit').click();
	const edit = new RegExp(
		`/portfolios/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/edit`,
	);
	await expect(page).toHaveURL(edit);
	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	// match screenshot
	expect(page.locator('text=Portfolio')).toBeTruthy();
	expect(await page.locator('#detailsPane').screenshot()).toMatchSnapshot({
		name: 'portfolio.png',
	});
});
