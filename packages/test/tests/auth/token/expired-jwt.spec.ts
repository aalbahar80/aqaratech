import { Cookie } from '@self/utils';

import { siteURL } from '../../api/fixtures/site-url';
import { expect, test } from '../auth-fixtures';

// Consider using test.use() to skip global setup login?
// test.use({ token: { name: Cookie.idToken, value: '123' } });

test('redirect to login form', async ({ page }) => {
	// expect to be redirected to login page
	// Checking for username/password input is flaky because it's on an external site,
	// if we still want to do so, at lease use test.slow()
	// await page.goto(siteURL);
	// const emailInput = page.locator('input[name="username"]');
	// const passwordInput = page.locator('input[name="password"]');
	// await expect(emailInput).toBeVisible();
	// await expect(passwordInput).toBeVisible();

	// Instead, test for the redirect to /auth/login

	// catch the request when it happens
	const requestPromise = page.waitForRequest((res) =>
		res.url().includes('/auth/login'),
	);

	await page.goto(siteURL);

	const request = await requestPromise;

	const response = await request.response();
	expect(response).toBeTruthy();

	if (!response) throw new Error('No response'); // type purposes only
	expect.soft(response.status()).toBe(302);

	const locationHeader = response.headers()['location'];
	expect(locationHeader).toBeTruthy();

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const location = new URL(locationHeader!);
	expect.soft(location.host).toContain('auth0.com');
	expect.soft(location.pathname).toBe('/authorize');

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const redirectParam = new URL(location.searchParams.get('redirect_uri')!);
	const redirect = new URL(redirectParam);

	expect.soft(redirect.pathname).toBe('/auth/callback');
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
