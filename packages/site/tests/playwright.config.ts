import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import type { formClasses } from './forms/form';

export type FormFixtures = { baseForm: keyof typeof formClasses };

type Config = PlaywrightTestConfig<FormFixtures>;

dotenvConfig({
	path: '../.env',
});

// console.log('LOCAL config is:', process.env.LOCAL);
// console.log('DOCKER config is:', process.env.LOCAL);
// console.log('REUSE_PRISMA config is:', process.env.REUSE_PRISMA);
// console.log('CI config is:', process.env.CI);
// console.log('CI config is:', process.env.DATABASE_URL);

const localConfig: Config = process.env.LOCAL
	? {
			use: {
				// headless: false,
				// launchOptions: {
				// 	args: [
				// 		'--window-position=3840,500',
				// 		// '--window-size="3840,5000"',
				// 		// '--window-size=1500,1500',
				// 	],
				// },
			},
	  }
	: {};

const extraBrowsers: Config['projects'] = process.env.DOCKER
	? [
			{ name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
			// { name: 'webkit', use: { ...devices['Desktop Safari'] } },
			// { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
			{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
			{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
			// Note: branded browsers need to explicitly installed
			// { name: 'Microsoft Edge', use: { channel: 'msedge' } },
			// { name: 'Google Chrome', use: { channel: 'chrome' } },
	  ]
	: [];

const commonTests = ['editForm.test.ts', 'newForm.test.ts'];

const config: Config = {
	fullyParallel: true,
	timeout: process.env.CI ? 30000 : 30000,
	expect: { timeout: 5000 },
	globalSetup: process.env.LOCAL ? undefined : './config/global-setup.ts',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? 'list' : 'html',
	use: {
		actionTimeout: 0,
		baseURL: 'http://localhost:3000',
		trace: process.env.CI
			? undefined
			: {
					mode: 'retain-on-failure',
					screenshots: true,
					snapshots: true,
					sources: true,
			  },
		browserName: 'chromium',
		...localConfig.use,
	},

	projects: [
		...extraBrowsers,
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			testIgnore: commonTests,
		},
		{
			name: 'client',
			use: { baseForm: 'clients' },
			testMatch: commonTests,
		},
		{
			name: 'tenant',
			use: { baseForm: 'tenants' },
			testMatch: commonTests,
		},
		{
			name: 'property',
			use: { baseForm: 'properties' },
			testMatch: commonTests,
		},
		{ name: 'unit', use: { baseForm: 'units' }, testMatch: commonTests },
		{
			name: 'expense',
			use: { baseForm: 'expenses' },
			testMatch: commonTests,
		},
		{
			name: 'maintenanceOrder',
			use: { baseForm: 'maintenanceOrders' },
			testMatch: commonTests,
		},
		{
			name: 'lease',
			use: { baseForm: 'leases' },
			testMatch: commonTests,
		},
	],
	webServer: {
		reuseExistingServer: true,
		port: 3000,
		command: 'cd ../ && pnpm run build && pnpm run preview',
	},
	...localConfig,
};

export default config;
