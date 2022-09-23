import { test as base } from '@playwright/test';

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
			token = cookies.find((c) => c.name === 'accessToken').value;
		} catch (e) {
			console.log(e);
		}
		await use(token);
	},
});

export { expect } from '@playwright/test';
