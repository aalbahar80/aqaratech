import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import {
	ClientForm,
	ExpenseForm,
	LeaseForm,
	MaintenanceOrderForm,
	PropertyForm,
	TenantForm,
	UnitForm,
	type FormType,
} from './forms/form.js';

type Config = PlaywrightTestConfig<{ baseForm: FormType }>;

dotenvConfig({
	path: '../.env',
});

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

const extraBrowsers = process.env.DOCKER
	? [
			{ name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
			{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
			{ name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
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
	timeout: 30 * 1000,
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
		trace: 'retain-on-failure',
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
			use: { baseForm: new ClientForm() },
			testMatch: commonTests,
		},
		{
			name: 'tenant',
			use: { baseForm: new TenantForm() },
			testMatch: commonTests,
		},
		{
			name: 'property',
			use: { baseForm: new PropertyForm() },
			testMatch: commonTests,
		},
		{ name: 'unit', use: { baseForm: new UnitForm() }, testMatch: commonTests },
		{
			name: 'lease',
			use: { baseForm: new LeaseForm() },
			testMatch: commonTests,
		},
		{
			name: 'expense',
			use: { baseForm: new ExpenseForm() },
			testMatch: commonTests,
		},
		{
			name: 'maintenanceOrder',
			use: { baseForm: new MaintenanceOrderForm() },
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
