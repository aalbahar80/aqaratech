import { test as base } from '@playwright/test';
import { Cookie } from '@self/utils';

type MyFixtures = {
	token: string;
};

base.use({
	baseURL: process.env.PUBLIC_API_URL,
});

export const test = base.extend<MyFixtures>({
	token: async ({}, use) => {
		let token: string;
		try {
			const cookies = (await import('./storageState.json')).cookies;
			token = cookies.find((c) => c.name === Cookie.accessToken).value;
		} catch (e) {
			console.log(e);
		}
		await use(token);
	},
});

export { expect } from '@playwright/test';
