import type { PlaywrightTestConfig } from '@playwright/test';
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
// console.log('DEV config is:', process.env.DEV);
const commonTests = ['forms/editForm.test.ts', 'forms/newForm.test.ts'];

const config: Config = {
	fullyParallel: true,
	timeout: process.env.CI ? 30000 : 30000,
	expect: { timeout: 10000 },
	globalSetup: './config/global-setup.ts',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 2,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? 'list' : 'html',
	use: {
		baseURL: 'http://localhost:3000/',
		screenshot: 'only-on-failure',
		storageState: 'config/adminState.json',
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
	testMatch: commonTests,
	testIgnore: ['forms/attribution.test.ts', 'login.spec.ts'],

	projects: [
		// ...extraBrowsers,
		{
			name: 'chromium',
			testMatch: ['forms/lease.test.ts', 'forms/property.test.ts'],
			testIgnore: commonTests,
		},
		// TODO: Enable once you figure out how not to pollute the environment
		// Hint: It has something to do with the storage state
		// Hint2: It has something to do with testMatch/testIgnore
		// {
		// 	name: 'Login',
		// 	use: {
		// 		...devices['Desktop Chrome'],
		// 		,
		// 	},
		// 	testMatch: ['login.spec.ts'],
		// },
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
		{
			name: 'unit',
			use: { baseForm: 'units' },
			testMatch: commonTests,
		},
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
		command: process.env.DEV
			? 'cd ../ && pnpm run dev'
			: 'cd ../ && pnpm run build && pnpm run preview',
	},
};

export default config;
