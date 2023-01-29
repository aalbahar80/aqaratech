import { expect, test } from '@playwright/test';

import { testOrgId } from '@self/seed';
import { PageType, getRoute } from '@self/utils';

const LOGIN = '/auth/login';

test('user redirected to destination after login', async ({ browser }) => {
	// create new context avoid interfering with interfering with other tests
	const context = await browser.newContext();
	await context.clearCookies();

	const page = await context.newPage();

	// catch the request when it happens
	const requestPromise = page.waitForRequest((res) =>
		res.url().includes(LOGIN),
	);

	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.List,
		params: {
			organizationId: testOrgId,
		},
	});

	await page.goto(url, {
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
	expect.soft(location.pathname).toBe('/authorize');

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const redirectParam = new URL(location.searchParams.get('redirect_uri')!);
	const redirect = new URL(redirectParam);

	expect.soft(redirect.searchParams.get('destination')).toBe(url);

	await context.close();
});
