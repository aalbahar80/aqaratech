import path from 'node:path';

import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { config as dotenv } from 'dotenv';

import type { AqaratechEnv } from '@self/utils';

import { TESTS } from './config/test-groups';
import { testUsers } from './tests/api/fixtures/users/test-users';
import { globalStoragePath } from './utils/global-storage-path';

import type { TestOptions } from './tests/api/fixtures/test-fixtures.interface';
import type { TokenTestOptions } from './tests/auth/auth-fixtures';

dotenv({
	path: '../../.env',
});

const env = {
	PUBLIC_IS_TESTING: '1',
} satisfies Partial<Record<keyof AqaratechEnv, string>>;

const BASE_TIMEOUT = 15 * 1000;

// @ts-expect-error ---
const NVIM: unknown = process.env.PW_NVIM;

const config: PlaywrightTestConfig<TestOptions & TokenTestOptions> = {
	globalSetup: require.resolve('./global-setup'),
	// globalTeardown: require.resolve('./global-teardown'),
	// showing the reporter prevents turbo from caching the test results (on flakey tests)
	testDir: './tests',
	reporter: process.env.CI
		? 'github'
		: NVIM
		? [['json'], ['list'], ['html', { open: 'never' }]]
		: [['list'], ['html', { open: 'never' }]],
	retries: NVIM ? 0 : 1,
	timeout: process.env.CI ? 30 * 1000 : BASE_TIMEOUT,
	maxFailures: 40,
	// workers: process.env.CI ? undefined : '35%',
	use: {
		storageState: path.join(
			globalStoragePath,
			testUsers.orgAdmin.storageStateFilename,
		),
		headless: true,
		ignoreHTTPSErrors: true,
		bypassCSP: true,
		baseURL: process.env.PUBLIC_SITE_URL,
		video: NVIM ? 'on' : 'retain-on-failure',
		trace: {
			mode: NVIM ? 'on' : 'retain-on-failure',
			screenshots: true,
			snapshots: true,
			sources: true,
			// @ts-expect-error bug
			fullPage: true,
		},
		launchOptions: {
			// slowMo: 100,
			args: ['--window-position=1,1'],
		},
	},
	webServer: [
		// To Debug, use env var: DEBUG="pw:webserver,pw:browser*,pw:api"
		{
			cwd: '../../',
			command: NVIM
				? 'echo "Please start server manually" 1>&2 && exit 1'
				: 'pnpm turbo run build --filter=@self/backend && pnpm -F @self/backend preview',
			port: 3002,
			reuseExistingServer: !process.env.CI,
			ignoreHTTPSErrors: true,
			timeout: 60 * 1000,
			env,
		},
		{
			cwd: '../../',
			command: NVIM
				? 'echo "Please start server manually" 1>&2 && exit 1'
				: 'pnpm turbo run build --filter=@self/site && pnpm -F @self/site preview',
			port: 3000,
			reuseExistingServer: !process.env.CI,
			ignoreHTTPSErrors: true,
			timeout: 120 * 1000,
			env,
		},
	],
	projects: [
		{
			name: 'api',
			testMatch: [...TESTS.API],
			use: {
				baseURL: process.env.PUBLIC_API_URL,
			},
		},
		{
			name: 'billing',
			testMatch: [...TESTS.BILLING],
			use: devices['Desktop Chrome'],
		},
		{
			name: 'site:chrome',
			testIgnore: [...TESTS.NON_SITE, ...TESTS.MOBILE_ONLY],
			use: devices['Desktop Chrome'],
		},
		{
			name: 'site:firefox',
			testIgnore: [
				...TESTS.MAIN_ONLY,
				...TESTS.NON_SITE,
				...TESTS.MOBILE_ONLY,
				'**/tests/components/expense-tree/drag.spec.ts',
			],
			use: devices['Desktop Firefox'],
		},
		{
			name: 'site:webkit',
			testIgnore: [
				...TESTS.MAIN_ONLY,
				...TESTS.NON_SITE,
				...TESTS.MOBILE_ONLY,
				'**/tests/pay/**/*.spec.ts', // route.fulfill doesn't work in webkit
				'**/tests/auth/token/expired-jwt.spec.ts',
			],
			use: devices['Desktop Safari'],
			// Webkit Issues:
			// - slow when calling form.verifyDetails(), but only in headless mode.
			// https://github.com/microsoft/playwright/issues/14479#issuecomment-1141928860
			// Webkit might be struggling when setting `waitUntil` when calling page.goto() or waiting for body.started
			timeout: BASE_TIMEOUT * 2,
		},
		{
			name: 'site:chrome:mobile',
			testIgnore: [
				...TESTS.MAIN_ONLY,
				...TESTS.NON_SITE,
				...TESTS.DESKTOP_ONLY,
				'**/tests/components/table/pagination.spec.ts', // TODO: fix for mobile
				'**/tests/remove/**/*.spec.ts', // pagination assertion fails
			],
			use: devices['Pixel 5'],
		},
		{
			name: 'site:webkit:mobile',
			use: devices['iPhone 13 Mini'],
			testIgnore: [
				...TESTS.MAIN_ONLY,
				...TESTS.NON_SITE,
				...TESTS.DESKTOP_ONLY,
				'**/tests/pay/**/*.spec.ts', // route.fulfill doesn't work in webkit
				'**/tests/auth/token/expired-jwt.spec.ts',
				'**/tests/components/table/pagination.spec.ts', // TODO: fix for mobile
				'**/tests/remove/**/*.spec.ts', // pagination assertion fails
			],
			timeout: BASE_TIMEOUT * 2,
		},
	],
};
export default config;
