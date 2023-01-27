import { expect, test } from '@playwright/test';

import { Cookie } from '@self/utils';

import { siteURL } from '../api/fixtures/site-url';

const LOGOUT = '/auth/logout';

test('cookies are cleared', async ({ browser }) => {
	// create new context avoid interfering with interfering with other tests
	const context = await browser.newContext();
	const page = await context.newPage();

	const cookieNames = [Cookie.idToken, Cookie.accessToken];

	// assert cookies exist at start
	const initialCookies = await page.context().cookies();

	for (const cookieName of cookieNames) {
		const cookie = initialCookies.find((cookie) => cookie.name === cookieName);

		expect(cookie, {
			message: 'Cookies should be defined at start of test',
		}).toBeDefined();
	}

	// catch the request when it happens
	const requestPromise = page.waitForRequest((res) =>
		res.url().includes(LOGOUT),
	);

	await page.goto(LOGOUT, {
		// avoid waiting for response from auth0, which is slow/flaky
		waitUntil: 'commit',
	});

	const request = await requestPromise;

	const response = await request.response();

	if (!response) throw new Error('No response'); // type purposes only
	expect.soft(response.status()).toBe(302);

	const locationHeader = response.headers()['location'];
	expect.soft(locationHeader).toBeTruthy();

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const location = new URL(locationHeader!);
	expect.soft(location.host).toContain('auth0.com');
	expect.soft(location.pathname).toBe('/v2/logout');

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const redirectParam = new URL(location.searchParams.get('returnTo')!);
	const redirect = new URL(redirectParam);

	expect.soft(redirect.toString()).toBe(siteURL + '/');

	// expect idToken and accessToken to be cleared
	const cookies = await page.context().cookies();

	for (const cookieName of cookieNames) {
		const cookie = cookies.find((cookie) => cookie.name === cookieName);

		expect.soft(cookie).toBe(undefined);
	}

	await context.close();
});
