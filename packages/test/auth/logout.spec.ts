import { expect, test } from '@playwright/test';
import { Cookie } from '@self/utils';

test('cookies are cleared', async ({ page }) => {
	await page.goto('/auth/logout');

	// expect idToken and accessToken to be cleared
	const cookies = await page.context().cookies();

	const cookieNames = [Cookie.idToken, Cookie.accessToken];

	for (const cookieName of cookieNames) {
		const cookie = cookies.find((cookie) => cookie.name === cookieName);

		expect(cookie).toBe(undefined);
	}
});
