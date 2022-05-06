import type { PlaywrightTestConfig } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import type { formClasses } from './admin/form';
import fs from 'fs';
import path from 'path';

export type FormFixtures = { baseForm: keyof typeof formClasses };

type Config = PlaywrightTestConfig<FormFixtures>;

dotenvConfig({
	// path: '../.env',
	path: require.resolve('../.env'),
});

// const commonTests = ['forms/editForm.test.ts', 'forms/newForm.test.ts'];
// const gs = require.resolve.paths('./global-setup.ts');
// console.log({ gs }, 'config.ts ~ 16');

// const dot = require('.').dirname;
// path.dirname(require.resolve('../.env'));
const a = path.dirname(require.resolve('../.env'));
const aa = path.dirname(require.resolve('global-setup.js'));
console.log({ aa }, 'config.ts ~ 24');
console.log({ a }, 'config.ts ~ 23');
const dot = path.resolve('.');
const bn = path.basename(require.resolve('../.env'));
// const bn = path.basename(require.resolve('./.global-setup.ts'));
console.log({ dot }, 'config.ts ~ 19');
console.log({ bn }, 'config.ts ~ 25');

const gsb = path.dirname(require.resolve('global-setup.js'));
console.log({ gsb }, 'config.ts ~ 24');

const gsp = path.resolve(__dirname, 'global-setup.ts');
console.log({ gsp }, 'config.ts ~ 33');

const siteDirectory = path.resolve(__dirname, '..');
console.log({ siteDirectory }, 'config.ts ~ 39');

export const config: Config = {
	fullyParallel: true,
	timeout: process.env.CI ? 30000 : 30000,
	expect: { timeout: 10000 },
	// globalSetup: './global-setup.ts',
	// globalSetup: require.resolve('global-setup'),
	globalSetup: gsp,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 2,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	reporter: process.env.CI ? 'list' : [['list'], ['html']],
	use: {
		baseURL: 'http://localhost:3000/',
		screenshot: 'only-on-failure',
		// storageState: './adminState.json',
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
	// testMatch: commonTests,
	// testIgnore: ['forms/attribution.test.ts', 'login.spec.ts'],

	// projects: [
	// 	// ...extraBrowsers,
	// 	{
	// 		name: 'chromium',
	// 		testMatch: ['forms/lease.test.ts', 'forms/property.test.ts'],
	// 		testIgnore: commonTests,
	// 	},
	// 	// {
	// 	// 	name: 'Pay',
	// 	// 	testMatch: ['pay/pay.test.ts'],
	// 	// 	use: {
	// 	// 		storageState: undefined,
	// 	// 	},
	// 	// 	testIgnore: commonTests,
	// 	// },
	// 	// TODO: Enable once you figure out how not to pollute the environment
	// 	// Hint: It has something to do with the storage state
	// 	// Hint2: It has something to do with testMatch/testIgnore
	// 	// {
	// 	// 	name: 'Login',
	// 	// 	use: {
	// 	// 		...devices['Desktop Chrome'],
	// 	// 		,
	// 	// 	},
	// 	// 	testMatch: ['login.spec.ts'],
	// 	// },
	// 	{
	// 		name: 'client',
	// 		use: { baseForm: 'clients' },
	// 		testMatch: commonTests,
	// 	},
	// 	{
	// 		name: 'tenant',
	// 		use: { baseForm: 'tenants' },
	// 		testMatch: commonTests,
	// 	},
	// 	{
	// 		name: 'property',
	// 		use: { baseForm: 'properties' },
	// 		testMatch: commonTests,
	// 	},
	// 	{
	// 		name: 'unit',
	// 		use: { baseForm: 'units' },
	// 		testMatch: commonTests,
	// 	},
	// 	{
	// 		name: 'expense',
	// 		use: { baseForm: 'expenses' },
	// 		testMatch: commonTests,
	// 	},
	// 	{
	// 		name: 'maintenanceOrder',
	// 		use: { baseForm: 'maintenanceOrders' },
	// 		testMatch: commonTests,
	// 	},
	// 	{
	// 		name: 'lease',
	// 		use: { baseForm: 'leases' },
	// 		testMatch: commonTests,
	// 	},
	// ],
	webServer: {
		reuseExistingServer: true,
		port: 3000,
		// command: 'cd /home/hydraii/projects/aqtech/packages/site && pnpm run dev',
		command: `cd ${siteDirectory} && pnpm run dev`,
		// command: process.env.DEV
		// 	? 'cd ../ && pnpm run dev'
		// 	: 'cd ../ && pnpm run build && pnpm run preview',
	},
};
