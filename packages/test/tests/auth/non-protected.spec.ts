import { expect, test } from '@playwright/test';

const PUBLIC_ROUTES = [
	//
	// '/', // TODO: test redirects to /en
	'/ar',
	'/en',
	'/health',
	// '/robots.txt', // TODO: enable this test when robots.txt is added
];

const NONEXISTENT_ROUTES = [
	//
	'/does-not-exist',
	'/en/does-not-exist',
];

const PROTECTED_ROUTES = [
	'/en/organization/1/portfolio',
	'/en/welcome',
	'/users/1',
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
});
