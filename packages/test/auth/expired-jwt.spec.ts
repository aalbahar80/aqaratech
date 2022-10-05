import { expect, test } from '@playwright/test';

// Consider using test.use() to skip global setup login?

test.describe('expired jwt', () => {
	test.beforeEach(async ({ context, baseURL, page }) => {
		const expiredIdToken =
			'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVvSmoxaGxCdWhZZFh0NmN5bTZtMyJ9.eyJodHRwczovL2xldGFuZC5iZS9yb2xlcyI6W10sImh0dHBzOi8vbGV0YW5kLmJlL2FwcE1ldGFkYXRhIjp7fSwibmlja25hbWUiOiJvcmcuZGVtbyIsIm5hbWUiOiJvcmcuZGVtb0BtYWlsdGhpbmsubmV0IiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzU3YzBjZjAzNmM2OGM4NGJhNzY4OTRiZGRhZGI0MzFjP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGb3IucG5nIiwidXBkYXRlZF9hdCI6IjIwMjItMDktMjlUMDM6MDU6NTkuNTMyWiIsImVtYWlsIjoib3JnLmRlbW9AbWFpbHRoaW5rLm5ldCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9kZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYyZTE0MzkyYTE0OWIyNzZkZDE3N2QzZiIsImF1ZCI6Ino2b3F5T3VQTGFvNlhoSmVDamU5dFo4WmJpSmE1emN0IiwiaWF0IjoxNjY0NDU3NjU5LCJleHAiOjE2NjQ0OTM2NTksInNpZCI6IjNWdFZ1M1J4QnVKT3VENm92bG92ZlUteHNmbzFoVDJEIn0.C0BAlhjoOelRWuCDquv0L_FLKp-y1nJYJcmFbvHnnqSlZZoEECo2B_qBpRp7VlWLnVE98dORvtPgNrNQRL1fwMMLC4tOIYoFZMWzdoAu651p1qOe8Ic8t-qLHES0v8PY1qIgquFsyeH3dprCgFzTD92b7bPllYz8klkkDljE0c3u-cMfZfTW0_zSz1xXWS5W8HGY-w1JMzD8JYPX5RPexS6OGCsXcT1PM2gfeNw_MKfKAHW0sn87F5w67axaPbD19pzREOXVdULK23lWtyuXqfSluPlLFDq-OufoDf5gfHiiXQY7VHImXAGh8fHuP2a52QoRBOUw5GqkotejYy0yww';

		const domain = baseURL ? new URL(baseURL).host : 'localhost';

		// replace the idToken cookie with an expired one
		// TODO: clear all cookies instead? If so, check access token doesn't interfere with result.
		await context.addCookies([
			{
				name: 'idToken',
				value: expiredIdToken,
				domain,
				path: '/',
				expires: Date.now() / 1000 + 86400, // expires tomorrow
				// TODO: differentiate between jwt expiry and cookie expiry. Test both.
			},
		]);
	});

	test('redirect to login form', async ({ page, baseURL }) => {
		await page.goto(baseURL!);
		// expect to be redirected to login page
		const emailInput = page.locator('input[name="username"]');
		const passwordInput = page.locator('input[name="password"]');
		await expect(emailInput).toBeVisible();
		await expect(passwordInput).toBeVisible();
	});

	test('cookies are cleared', async ({ page, baseURL }) => {
		await page.goto(baseURL!, {
			waitUntil: 'networkidle',
		});

		// expect idToken and accessToken to be cleared
		const cookies = await page.context().cookies();

		const idTokenCookie = cookies.find((cookie) => cookie.name === 'idToken');
		expect(idTokenCookie).toBe(undefined);

		const accessTokenCookie = cookies.find(
			(cookie) => cookie.name === 'accessToken',
		);
		expect(accessTokenCookie).toBe(undefined);
	});
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.skip('expired cookies are handled', async () => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.skip('expired accesstoken is refreshed', async () => {});

// eslint-disable-next-line @typescript-eslint/no-empty-function
test.skip('jwt is refreshed', async () => {});
