import type { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import type { formClasses } from './tests/admin/form.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
	path: path.resolve(__dirname, '.env.test'),
	override: true,
});

const commonForms = [
	'newForm.test.ts',
	'editForm.test.ts',
	'dropdowns.test.ts',
];

export type FormFixtures = { baseForm: keyof typeof formClasses };
type Config = PlaywrightTestConfig<FormFixtures>;

// This is a common configuration for different test directories.
// This approach was required because playwright's config.projects were problematic when it comes to tests starting with a different initial auth state.
export const config: Config = {
	fullyParallel: true,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	retries: process.env.CI ? 5 : 2,
	maxFailures: process.env.CI ? 30 : 30,
	forbidOnly: !!process.env.CI,
	timeout: process.env.CI ? 30000 : 30000,
	expect: { timeout: 10000 },
	globalSetup: './tests/global-setup.ts',
	reporter: process.env.CI
		? [['list'], ['html']]
		: [['list'], ['html', { open: 'never' }]],
	testDir: './tests',
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
		// to make sure app and tests are using same db branch
		reuseExistingServer: false,
		port: 3000,
		command: 'pnpm run preview',
	},
	projects: [
		// {
		// 	name: 'pay',
		// 	testMatch: ['pay.test.ts'],
		// 	timeout: 60 * 1000,
		// 	retries: 0, // until mocking
		// },
		{
			name: 'login',
			testMatch: ['login.spec.ts'],
		},
		{
			name: 'general',
			testMatch: [
				'lease.test.ts',
				'property.test.ts',
				'unit.test.ts',
				'date-range.test.ts',
				'trx-schedule.test.ts',
			],
		},
		{
			name: 'dates-LA',
			testMatch: ['date-range.test.ts', 'trx-schedule.test.ts'],
			use: {
				timezoneId: 'America/Los_Angeles',
			},
		},
		{
			name: 'dates-Tokyo',
			testMatch: ['date-range.test.ts', 'trx-schedule.test.ts'],
			use: {
				timezoneId: 'Asia/Tokyo',
			},
		},
		{
			name: 'portfolio',
			use: { baseForm: 'portfolios' },
			testMatch: commonForms,
		},
		{
			name: 'tenant',
			use: { baseForm: 'tenants' },
			testMatch: commonForms,
		},
		{
			name: 'property',
			use: { baseForm: 'properties' },
			testMatch: commonForms,
		},
		{
			name: 'unit',
			use: { baseForm: 'units' },
			testMatch: commonForms,
		},
		{
			name: 'expense',
			use: { baseForm: 'expenses' },
			testMatch: [...commonForms, 'attribution.test.ts'],
		},
		{
			name: 'maintenanceOrder',
			use: { baseForm: 'maintenanceOrders' },
			testMatch: [...commonForms, 'attribution.test.ts'],
		},
		{
			name: 'lease',
			use: { baseForm: 'leases' },
			testMatch: commonForms,
		},
	],
};

export default config;
