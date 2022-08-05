import { test as base } from "@playwright/test";

export const test = base.extend({
	page: async ({ page }, use) => {
		page.addInitScript({
			content: `
				addEventListener('sveltekit:start', () => {
					document.body.classList.add('started');
				});
			`,
		});

		const goto = page.goto;
		page.goto = async function (url, opts) {
			const res = await goto.call(page, url, opts);
			await page.waitForSelector("body.started", { timeout: 5000 });
			return res;
		};
		await use(page);
	},
});
