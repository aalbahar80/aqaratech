import { expect, test } from '@playwright/test';

import { testOrgEmail, testPassword } from '@self/seed';
import { Cookie } from '@self/utils';

import { siteURL } from '../api/fixtures/site-url';

import { LoginPage } from './login-page';

const user = {
	role: 'orgadmin',
	email: testOrgEmail,
	password: testPassword,
	destination: () => '/',
};

test.use({
	storageState: { cookies: [], origins: [] },
});

test('login', async ({ page, isMobile }) => {
	test.slow();

	const { email, password } = user;

	const loginPage = new LoginPage(page, isMobile);
	await loginPage.goto();
	await loginPage.fill({ email, password });

	const domain = new URL(siteURL).hostname;

	const cookies = await page.context().cookies();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
	const accessToken = cookies.find((c) => c.name === Cookie.accessToken);

	const selectRolePage = /^users\/[\w-]+\.[\w-]+\.[\w-]+\/roles$/;

	const possibleDestinations = ['/', selectRolePage, user.destination()];

	// check that url is one of the possible destinations
	await expect.soft(page).toHaveURL(RegExp(possibleDestinations.join('|')));

	const token = {
		value: expect.stringMatching(/^[\w-]+\.[\w-]+\.[\w-]+$/),
		domain,
		path: '/',
		expires: expect.any(Number),
		// httpOnly: true, # `false` for non-live environments
		// sveltekit sets secure to true only in production
		// secure: true,
	};

	expect.soft(accessToken).toMatchObject({
		name: Cookie.accessToken,
		...token,
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
	const idToken = cookies.find((c) => c.name === Cookie.idToken);

	expect.soft(idToken).toMatchObject({
		name: Cookie.idToken,
		...token,
	});
});
