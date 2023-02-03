import { expect, test } from '@playwright/test';

const PUBLIC_ROUTES = [
	//
	// '/', // TODO: test redirects to /en
	'/ar',
	'/en',
	'/health',
	'/robots.txt',
];

const NONEXISTENT_ROUTES = [
	//
	'/does-not-exist',
	'/en/does-not-exist',
	'/en/organization/1/portfolio',
	'/users/1',
];

const PROTECTED_ROUTES = [
	//
	'/en/welcome',
];

// test that public routes are not protected (return 200, don't redirect to login). Run tests without storage state.
test.describe('unauthorized users', () => {
	test.use({
		storageState: { cookies: [], origins: [] },
	});
	test.setTimeout(3000);

	for (const route of PUBLIC_ROUTES) {
		test(`should be able to access ${route}`, async ({ page }) => {
			const resPromise = page.waitForResponse(
				(res) => new URL(res.url()).pathname === route,
			);

			await page.goto(route);

			const res = await resPromise;

			expect.soft(res.status()).toBe(200);
		});
	}

	for (const route of NONEXISTENT_ROUTES) {
		test(`should get 404 for ${route}`, async ({ page }) => {
			const resPromise = page.waitForResponse(
				(res) => new URL(res.url()).pathname === route,
			);

			await page.goto(route);

			const res = await resPromise;

			expect.soft(res.status()).toBe(404);
		});
	}

	for (const route of PROTECTED_ROUTES) {
		test(`should be redirected to login for ${route}`, async ({ page }) => {
			const resPromise = page.waitForResponse(
				(res) => new URL(res.url()).pathname === route,
			);

			await page.goto(route);

			const res = await resPromise;

			expect.soft(res.status()).toBe(302);
			expect.soft(res.headers()['location']).toBeTruthy();
		});
	}
});
