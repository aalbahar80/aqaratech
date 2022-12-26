import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { config as dotenv } from 'dotenv';

import { TESTS } from './config/test-groups';
import {
	EXPIRED_ACCESS_TOKEN,
	EXPIRED_ID_TOKEN,
} from './constants/expired-id-token';
import { testUsers } from './tests/api/fixtures/users/test-users';

import type { TokenTestOptions } from './tests/auth/auth-fixtures';

dotenv({
	path: '../../.env',
});

const BASE_TIMEOUT = 10 * 1000;

const config: PlaywrightTestConfig<TokenTestOptions> = {
	globalSetup: require.resolve('./global-setup'),
	globalTeardown: require.resolve('./global-teardown'),
	// showing the reporter prevents turbo from caching the test results (on flakey tests)
	reporter: process.env.CI ? 'github' : [['list'], ['html', { open: 'never' }]],
	retries: 1,
	timeout: process.env.CI ? 30 * 1000 : BASE_TIMEOUT,
	maxFailures: 40,
	workers: process.env.CI ? undefined : '70%',
	use: {
		storageState: testUsers.orgAdmin.storageStatePath,
		headless: true,
		ignoreHTTPSErrors: true,
		bypassCSP: true,
		baseURL: process.env.PUBLIC_SITE_URL,
		// viewport: { width: 1920, height: 1080 },
		video: 'on-first-retry',
		trace: {
			mode: 'on-first-retry',
			screenshots: true,
			snapshots: true,
			sources: true,
			// @ts-expect-error bug
			fullPage: true,
		},
	},
	webServer: [
		// To Debug, use env var: DEBUG=pw:webserver
		// Build with turbo, then run preview seperately. This is to enable turbo to cache the build.
		{
			cwd: '../../',
			command:
				'pnpm turbo run build --filter=@self/backend && pnpm -F @self/backend preview',
			port: 3002,
			reuseExistingServer: !process.env.CI,
			ignoreHTTPSErrors: true,
			timeout: 60 * 1000,
			// env: { DEBUG: 'pw:webserver' },
		},
		{
			cwd: '../../',
			command:
				'pnpm turbo run build --filter=@self/site && pnpm -F @self/site preview',
			port: 3000,
			reuseExistingServer: !process.env.CI,
			ignoreHTTPSErrors: true,
			timeout: 120 * 1000,
			// env: { DEBUG: 'pw:webserver' },
		},
	],
	projects: [
		{
			name: 'files',
			testMatch: [...TESTS.FILE],
		},
		{
			name: 'idToken',
			testMatch: '**/token/**/*.spec.ts',
			use: { token: EXPIRED_ID_TOKEN },
		},
		{
			name: 'accessToken',
			testMatch: '**/token/**/*.spec.ts',
			use: { token: EXPIRED_ACCESS_TOKEN },
		},
		{
			name: 'api',
			testMatch: [TESTS.API],
			testIgnore: [...TESTS.FILE],
			use: {
				baseURL: process.env.PUBLIC_API_URL,
			},
		},
		{
			name: 'site:chrome',
			testIgnore: [...TESTS.NON_SITE, ...TESTS.MOBILE_ONLY],
			use: {
				...devices['Desktop Chrome'],
				launchOptions: {
					args: ['--window-position=0,0'],
				},
			},
		},
		{
			name: 'site:firefox',
			testIgnore: [
				...TESTS.NON_SITE,
				...TESTS.MOBILE_ONLY,
				'**/tests/components/expense-tree/drag.spec.ts',
				'**/tests/auth/token/expired-jwt.spec.ts', // TODO: fix this test
			],
			use: devices['Desktop Firefox'],
		},
		{
			name: 'site:webkit',
			testIgnore: [
				...TESTS.NON_SITE,
				...TESTS.MOBILE_ONLY,
				'**/tests/onboarding/new-user.spec.ts', // TODO: fix
				'**/tests/auth/token/expired-jwt.spec.ts', // TODO: fix
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
				...TESTS.NON_SITE,
				...TESTS.DESKTOP_ONLY,
				'**/tests/components/table/pagination.spec.ts', // TODO: fix for mobile
			],
			grepInvert: [
				/screenshot/g, // causes terminal encoding issues
				/delete/g,
			],
			use: devices['Pixel 5'],
		},
		// {
		// 	name: 'site:webkit:mobile',
		// 	use: devices['iPhone 13 Mini'],
		// 	testIgnore: [
		// 		...TESTS.NON_SITE,
		//		...TESTS.DESKTOP_ONLY,
		// 		'**/tests/components/table/pagination.spec.ts', // TODO: fix for mobile
		// 		'**/tests/auth/token/expired-jwt.spec.ts', // TODO: fix
		// 		'**/tests/forms/lease-invoice/**/*.spec.ts', // fails in headless mode. viewport shakes
		// 		'**/tests/dashboard/csv/**/*.spec.ts', // TODO: fix
		// 		'**/tests/onboarding/new-user.spec.ts', // TODO: fix
		// 		'**/test/tests/dashboard/filter-reset.spec.ts', // issues waiting for body.started (uses scopedPage)
		// 	],
		// 	grepInvert: [
		// 		/screenshot/g, // causes terminal encoding issues
		// 		/delete/g, // causes terminal encoding issues
		// 	],
		// },
	],
};
export default config;
