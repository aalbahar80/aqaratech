import { expect, test } from '@playwright/test';

test('cookies are cleared', async ({ page }) => {
	await page.goto('/auth/logout');

	// expect idToken and accessToken to be cleared
	const cookies = await page.context().cookies();

	const cookieNames = ['idToken', 'accessToken'];

	for (const cookieName of cookieNames) {
		const cookie = cookies.find((cookie) => cookie.name === cookieName);

		expect(cookie).toBe(undefined);
	}
});
