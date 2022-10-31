import { test as base } from '@playwright/test';

export const test = base.extend({
	page: async ({ page }, use) => {
		// TODO replace with page.goto(url, { waitUntil: "networkidle" })
		// eslint-disable-next-line @typescript-eslint/unbound-method
		const goto = page.goto;
		page.goto = async function (url, opts) {
			const res = await goto.call(page, url, opts);
			// https://github.com/sveltejs/kit/pull/6484
			await page.waitForSelector('body.started', { timeout: 5000 });
			return res;
		};
		await use(page);
	},
});
