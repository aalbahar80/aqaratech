import type { PlaywrightTestConfig } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({
	path: '../../.env',
});

const config: PlaywrightTestConfig = {
	name: 'Pay',
	fullyParallel: true,
	timeout: process.env.CI ? 30000 : 30000,
	expect: { timeout: 10000 },
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	globalSetup: './global-setup.ts',
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? 'list' : 'html',
	use: {
		baseURL: 'http://localhost:3000/',
		screenshot: 'only-on-failure',
		trace: {
			mode: 'on',
			screenshots: true,
			snapshots: true,
			sources: true,
		},
		video: 'retry-with-video',
		browserName: 'chromium',
		// launchOptions: {
		// 	args: [
		// 		'--window-position=3840,500',
		// 		// '--window-size="3840,5000"',
		// 		// '--window-size=1500,1500',
		// 	],
		// },
	},
	testMatch: ['pay.test.ts'],

	webServer: {
		reuseExistingServer: true,
		port: 3000,
		command: process.env.DEV
			? 'cd ../../ && pnpm run dev'
			: 'cd ../../ && pnpm run build && pnpm run preview',
	},
};

export default config;
