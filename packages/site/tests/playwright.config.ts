import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import {
	ClientForm,
	ExpenseForm,
	LeaseForm,
	MaintenanceOrderForm,
	PropertyForm,
	TenantForm,
	UnitForm,
} from './forms/form.js';

type Forms =
	| ClientForm
	| PropertyForm
	| UnitForm
	| TenantForm
	| LeaseForm
	| ExpenseForm
	| MaintenanceOrderForm;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig<{ baseForm: Forms }> = {
	fullyParallel: true,
	// testDir: './tests',
	// testMatch: ['client.test.ts', 'admin.spec.ts'],
	/* Maximum time one test can run for. */

	timeout: 30 * 1000,
	expect: {
		/**
		 * Maximum time expect() should wait for the condition to be met.
		 * For example in `await expect(locator).toHaveText();`
		 */
		timeout: 5000,
	},
	globalSetup: './config/global-setup.ts',
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	// workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI ? 'list' : 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		// headless: false,
		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: 'http://localhost:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'retain-on-failure',
		// launchOptions: {
		// 	args: [
		// 		'--window-position=3840,500',
		// 		// '--window-size="3840,5000"',
		// 		// '--window-size=1500,1500',
		// 	],
		// },
		browserName: 'chromium',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'client',
			use: { baseForm: new ClientForm() },
		},
		{
			name: 'tenant',
			use: { baseForm: new TenantForm() },
		},
		{
			name: 'property',
			use: { baseForm: new PropertyForm() },
		},
		{
			name: 'unit',
			use: { baseForm: new UnitForm() },
		},
		{
			name: 'lease',
			use: { baseForm: new LeaseForm() },
		},
		{
			name: 'expense',
			use: { baseForm: new ExpenseForm() },
		},
		{
			name: 'maintenanceOrder',
			use: { baseForm: new MaintenanceOrderForm() },
		},

		// {
		// 	name: 'chromium',
		// 	use: {
		// 		...devices['Desktop Chrome'],
		// 	},
		// },
		// {
		// 	name: 'webkit',
		// 	use: {
		// 		...devices['Desktop Safari'],
		// 	},
		// },
		// {
		// 	name: 'firefox',
		// 	use: {
		// 		...devices['Desktop Firefox'],
		// 	},
		// },
		/* Test against mobile viewports. */
		// {
		// 	name: 'Mobile Chrome',
		// 	use: {
		// 		...devices['Pixel 5'],
		// 	},
		// },
		// {
		// 	name: 'Mobile Safari',
		// 	use: {
		// 		...devices['iPhone 12'],
		// 	},
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: {
		//     channel: 'msedge',
		//   },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: {
		//     channel: 'chrome',
		//   },
		// },
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	// outputDir: 'test-results/',

	/* Run your local dev server before starting the tests */
	webServer: {
		port: 3000,
		command: 'cd ../ && pnpm run build && pnpm run preview',
	},
};

export default config;
