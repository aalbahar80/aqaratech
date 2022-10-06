import { test as base, type BrowserContextOptions } from '@playwright/test';
import { EXPIRED_ID_TOKEN } from '../constants/expired-id-token';

interface Token {
	name: string;
	value: string;
}

export interface TokenTestOptions {
	token: Token;

	// This is a workaround for baseURL being nullable in Playwright's test fixtures.
	baseURL: BrowserContextOptions['baseURL'];
}

export const test = base.extend<TokenTestOptions>({
	token: [EXPIRED_ID_TOKEN, { option: true }],

	page: async ({ page, token, baseURL }, use) => {
		if (!token) {
			// await use(page);
			// return;
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
	},
});

export { expect } from '@playwright/test';
