import { Page, test as base } from "@playwright/test";

type MyFixtures = {
	page: Page;
	token: string;
	apiBaseURL: string;
};

export const test = base.extend<MyFixtures>({
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
	token: async ({}, use) => {
		let token: string;
		try {
			const cookies = (await import("./storageState.json")).cookies;
			token = cookies.find((c) => c.name === "accessToken").value;
		} catch (e) {
			console.log(e);
		}
		await use(token);
	},
	apiBaseURL: async ({}, use) => {
		const apiBaseUrl = process.env.PUBLIC_API_URL;
		await use(apiBaseUrl);
	},
});
