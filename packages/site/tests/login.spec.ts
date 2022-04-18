import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	// TODO see more succint way of writing this:
	// https://playwright.dev/docs/test-auth#sign-in-with-beforeeach
	// Runs before each test and signs in each page.

	// Home Page
	// await page.goto('http://localhost:3000/');
	// await page.locator('text=Log in').click();

	// Directly to login page
	await page.goto('http://localhost:3000');

	// TODO only use one login button to avoid last()
	await page.locator('a:has-text("Log in")').last().click();

	// await expect(page).toHaveURL(
	// 	'https://dev-eehvhdp2.eu.auth0.com/u/login?state=hKFo2SBxdmtTUXJVV0M1YThlbHVhb1llRUFROG9VdEdIcWFsT6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHJwSzUtc200ZDZOdTNOUWtENElsSGRoVTZHQ1BaTDdio2NpZNkgejZvcXlPdVBMYW82WGhKZUNqZTl0WjhaYmlKYTV6Y3Q',
	// );
	await page.locator('input[name="username"]').click();
	await page.locator('input[name="username"]').click();
	await page
		.locator('input[name="username"]')
		.fill('dev.tester.3@mailthink.net');
	await page.locator('input[name="password"]').click();
	await page.locator('input[name="password"]').fill('HVuc1C8Ls9CN');
	await page.locator('button[name="action"]').click();
});

test('Redirected to home page after loggin in', async ({ page }) => {
	await expect(page).toHaveURL('http://localhost:3000/');
});

test('accessToken exists', async ({ context }) => {
	const cookies = await context.cookies();
	const accessToken = cookies.find((c) => c.name === 'accessToken');
	expect(accessToken).toMatchObject({
		name: 'accessToken',
		value: expect.stringMatching(
			/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/,
		),
		domain: 'localhost',
		path: '/',
		expires: expect.any(Number),
		httpOnly: true,
		secure: true,
	});
});

test('idToken exists', async ({ context }) => {
	const cookies = await context.cookies();
	const idToken = cookies.find((c) => c.name === 'idToken');
	expect(idToken).toMatchObject({
		name: 'idToken',
		value: expect.stringMatching(
			/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/,
		),
		domain: 'localhost',
		path: '/',
		expires: expect.any(Number),
		httpOnly: true,
		secure: true,
	});
});
