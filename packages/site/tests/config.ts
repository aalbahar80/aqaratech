import type { PlaywrightTestConfig } from '@playwright/test';
import { test as base } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenvConfig({
	path: path.resolve(__dirname, '../../../.env.test'),
});

// This is a common configuration for different test directories.
// This approach was required because playwright's config.projects were problematic when it comes to tests starting with a different initial auth state.
export const config: PlaywrightTestConfig = {
	fullyParallel: true,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	retries: process.env.CI ? 5 : 2,
	maxFailures: process.env.CI ? 30 : 30,
	forbidOnly: !!process.env.CI,
	timeout: process.env.CI ? 30000 : 30000,
	expect: { timeout: 10000 },
	globalSetup: path.resolve(__dirname, 'global-setup.ts'),
	reporter: process.env.CI ? [['list'], ['html']] : [['list'], ['html']],
	use: {
		baseURL: 'http://localhost:3000/',
		screenshot: 'only-on-failure',
		trace: {
			mode: 'on',
			screenshots: true,
			snapshots: true,
			sources: true,
		},
		browserName: 'chromium',
		// launchOptions: {
		// 	args: [
		// 		'--window-position=3840,500',
		// 		// '--window-size="3840,5000"',
		// 		// '--window-size=1500,1500',
		// 	],
		// },
	},
	webServer: {
		reuseExistingServer: true,
		port: 3000,
		command: process.env.DEV
			? `cd ${path.resolve(__dirname, '..')} && pnpm run dev`
			: `cd ${path.resolve(
					__dirname,
					'..',
			  )} && pnpm run build && pnpm run preview`,
	},
};

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
			await page.waitForSelector('body.started', { timeout: 5000 });
			return res;
		};
		await use(page);
	},
});
