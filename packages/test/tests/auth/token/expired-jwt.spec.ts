import { Cookie } from '@self/utils';
import { siteURL } from '../../api/fixtures/site-url';
import { expect, test } from '../auth-fixtures';

// Consider using test.use() to skip global setup login?
// test.use({ token: { name: Cookie.idToken, value: '123' } });

test.fixme('redirect to login form', async ({ page }) => {
	await page.goto(siteURL);
	// expect to be redirected to login page
	const emailInput = page.locator('input[name="username"]');
	const passwordInput = page.locator('input[name="password"]');
	await expect(emailInput).toBeVisible();
	await expect(passwordInput).toBeVisible();
});

test('cookies are cleared', async ({ page }) => {
	await page.goto(`${siteURL}/concierge`);
	// expect idToken and accessToken to be cleared
	const cookies = await page.context().cookies();

	const cookieNames = [Cookie.idToken, Cookie.accessToken];

	for (const cookieName of cookieNames) {
		const cookie = cookies.find((cookie) => cookie.name === cookieName);

		expect(cookie).toBe(undefined);
	}
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.skip('expired cookies are handled', async () => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.skip('expired accesstoken is refreshed', async () => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.skip('jwt is refreshed', async () => {});
