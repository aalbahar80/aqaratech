import { expect, test } from '@playwright/test';

import { siteURL } from '../api/fixtures/site-url';

const PUBLIC_ROUTES = [
	//
	// '/', // TODO: test redirects to /en
	'/ar',
	'/en',
	'/health',
	'/robots.txt',
	'/favicon.png',
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
	'/en/organizations/1/portfolios',
];

// test that public routes are not protected (return 200, don't redirect to login). Run tests without storage state.
test.describe('unauthorized users', () => {
	test.describe.configure({ mode: 'parallel', timeout: 3000 });

	test.use({
		storageState: { cookies: [], origins: [] },
	});

	for (const route of PUBLIC_ROUTES) {
		test(`should be able to access ${route}`, async ({ request }) => {
			const url = siteURL + route;

			const res = await request.get(url, { maxRedirects: 0 });

			expect.soft(res.status()).toBe(200);
		});
	}

	for (const route of NONEXISTENT_ROUTES) {
		test(`should get 404 for ${route}`, async ({ request }) => {
			const url = siteURL + route;

			const res = await request.get(url, { maxRedirects: 0 });

			expect.soft(res.status()).toBe(404);
		});
	}

	for (const route of PROTECTED_ROUTES) {
		test(`should be redirected to login for ${route}`, async ({ request }) => {
			const url = siteURL + route;

			const res = await request.get(url, { maxRedirects: 0 });

			expect.soft(res.status()).toBe(302);
			expect
				.soft(res.headers()['location'])
				.toBe('/auth/login?destination=' + route);
		});
	}

	test(`should be redirected to /en from /`, async ({ request }) => {
		const url = siteURL + '/';

		const res = await request.get(url, { maxRedirects: 0 });

		expect.soft(res.status()).toBe(302);
		expect.soft(res.headers()['location']).toBe('/en');
	});
});
