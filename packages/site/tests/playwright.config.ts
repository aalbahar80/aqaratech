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
type Config = PlaywrightTestConfig<{ baseForm: Forms }>;

const localConfig: Config = process.env.LOCAL
	? {
			use: {
				headless: false,
				launchOptions: {
					args: [
						'--window-position=3840,500',
						// '--window-size="3840,5000"',
						// '--window-size=1500,1500',
					],
				},
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

const config: Config = {
	fullyParallel: true,
	timeout: 30 * 1000,
	expect: { timeout: 5000 },
	globalSetup: './config/global-setup.ts',
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
		{ name: 'client', use: { baseForm: new ClientForm() } },
		{ name: 'tenant', use: { baseForm: new TenantForm() } },
		{ name: 'property', use: { baseForm: new PropertyForm() } },
		{ name: 'unit', use: { baseForm: new UnitForm() } },
		{ name: 'lease', use: { baseForm: new LeaseForm() } },
		{ name: 'expense', use: { baseForm: new ExpenseForm() } },
		{ name: 'maintenanceOrder', use: { baseForm: new MaintenanceOrderForm() } },
	],
	webServer: {
		reuseExistingServer: true,
		port: 3000,
		command: 'cd ../ && pnpm run build && pnpm run preview',
	},
	...localConfig,
};

export default config;
