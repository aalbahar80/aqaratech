import { test as base } from '@playwright/test';

import { EXPIRED_ID_TOKEN } from '../../constants/expired-id-token';

interface Token {
	name: string;
	value: string;
}

export interface TokenTestOptions {
	token: Token;
}

export const test = base.extend<TokenTestOptions>({
	token: [EXPIRED_ID_TOKEN, { option: true }],

	page: async ({ browser, token, baseURL, storageState }, use) => {
		if (!storageState) {
			throw new Error('storageState is required'); // Monitor/remove
		}

		// Create a new context.
		const context = await browser.newContext({
			storageState,
		});

		const page = await context.newPage();

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!token) {
			throw new Error('token is not set');
		}

		const domain = baseURL ? new URL(baseURL).host : 'localhost';

		// replace the idToken cookie with an expired one
		// TODO: clear all cookies instead? If so, check access token doesn't interfere with result.
		await page.context().addCookies([
			{
				name: token.name,
				value: token.value,
				domain,
				path: '/',
				expires: Date.now() / 1000 + 86400, // expires tomorrow
				// TODO: differentiate between jwt expiry and cookie expiry. Test both.
			},
		]);

		await use(page);

		await context.close();
	},
});

export { expect } from '@playwright/test';
