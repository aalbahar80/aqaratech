import { test, expect } from '@playwright/test';

const email = 'dev.tester.4@mailthink.net';
const password = 'test12';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:3000');

	// TODO only use one login button to avoid last()
	await page.locator('a:has-text("Log in")').last().click();

	// await expect(page).toHaveURL()

	await page.fill('input[name="username"]', email);
	await page.fill('input[name="password"]', password);

	await page.locator('button[name="action"]').click();
});

test('Redirected to tenant portal after logging in', async ({ page }) => {
	await expect(page).toHaveURL(/^http:\/\/localhost:3000\/portal\/tenant\/.*$/);
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
