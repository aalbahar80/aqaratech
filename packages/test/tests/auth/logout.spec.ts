import { expect, test } from '@playwright/test';

import { Cookie } from '@self/utils';

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

	// logout
	await page.goto('/auth/logout');

	// expect idToken and accessToken to be cleared
	const cookies = await page.context().cookies();

	for (const cookieName of cookieNames) {
		const cookie = cookies.find((cookie) => cookie.name === cookieName);

		expect(cookie).toBe(undefined);
	}

	await context.close();
});
