import { test as base } from '@playwright/test';
import type { FormFixtures } from '../playwright.config.js';

export type Newable<T> = { new (...args: any[]): T };

export const test = base.extend<FormFixtures>({
	page: async ({ page }, use) => {
		// Ensures that sveltekit is done hydrating the page
		// https://github.com/sveltejs/kit/blob/39eaf0905f28c55ba7ee3fe9ba67ec487290a6b2/packages/kit/test/utils.js#L101
		await page.addInitScript({
			content: `
				addEventListener('sveltekit:start', () => {
					document.body.classList.add('started');
				});
			`,
		});

		const goto = page.goto;
		page.goto = async function (url, opts) {
			const res = await goto.call(page, url, opts);
			console.time('wait for started');
			await page.waitForSelector('body.started', { timeout: 5000 });
			console.timeEnd('wait for started');
			return res;
		};
		await use(page);
	},
	baseForm: ['clients', { option: true }],
});

export { expect } from '@playwright/test';
