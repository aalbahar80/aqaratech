import { test, expect } from '@playwright/test';

test('the login process', async ({ page }) => {
	// Go to http://localhost:3000/
	await page.goto('http://localhost:3000/');

	// Click text=Log in
	await page.locator('text=Log in').click();
	// await expect(page).toHaveURL(
	// 	'https://dev-eehvhdp2.eu.auth0.com/u/login?state=hKFo2SBxdmtTUXJVV0M1YThlbHVhb1llRUFROG9VdEdIcWFsT6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHJwSzUtc200ZDZOdTNOUWtENElsSGRoVTZHQ1BaTDdio2NpZNkgejZvcXlPdVBMYW82WGhKZUNqZTl0WjhaYmlKYTV6Y3Q',
	// );

	// Click input[name="username"]
	await page.locator('input[name="username"]').click();

	// Fill input[name="username"]
	await page.locator('input[name="username"]').click();
	await page
		.locator('input[name="username"]')
		.fill('dev.tester.3@mailthink.net');

	// Click input[name="password"]
	await page.locator('input[name="password"]').click();

	// Fill input[name="password"]
	await page.locator('input[name="password"]').fill('HVuc1C8Ls9CN');

	await page.locator('button[name="action"]').click();

	await page.waitForNavigation(/*{ url: 'http://localhost:3000/' }*/);
	await expect(page).toHaveURL('http://localhost:3000/');
	await page.locator('text="Units"').click();

	// Click text=New
	await Promise.all([
		page.waitForNavigation(/*{ url: 'http://localhost:3000/new/units' }*/),
		page.locator('text=New').click(),
	]);

	// Select [object Object]
	await page.locator('#clientId').selectOption({
		label: 'مأمون النجار',
	});

	expect(
		await page.locator('#propertyId').selectOption('شاليهات الضباعية ق 8 م 39'),
	).toBeTruthy();
	await page.pause();
	expect(
		await page.locator('#propertyId').selectOption('شاليهات الضباjية ق 8 م 39'),
	).toBeFalsy();
	// Select [object Object]
	await page.locator('#propertyId').selectOption('شاليهات الضباعية ق 8 م 39');

	// Select [object Object]
	await page.locator('#clientId').selectOption('[object Object]');

	// Select [object Object]
	await page.locator('#propertyId').selectOption('[object Object]');

	// Click text=Create new
	await page.locator('text=Create new').click();
});
