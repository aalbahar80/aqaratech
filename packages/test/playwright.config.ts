import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { config as dotenv } from 'dotenv';
import {
	EXPIRED_ACCESS_TOKEN,
	EXPIRED_ID_TOKEN,
} from './constants/expired-id-token';
import type { TokenTestOptions } from './tests/auth/auth-fixtures';

dotenv({
	path: '../../.env',
});

const API_FILES = '**/tests/api/**/*.spec.ts';
const FILE_TESTS = [
	'**/tests/forms/file/**/*.spec.ts',
	'**/tests/api/files/**/*.spec.ts',
];

const NON_SITE_TESTS = [API_FILES, ...FILE_TESTS];

const MOBILE_ONLY_TESTS = ['**/tests/components/sidebar.spec.ts'];
const DESKTOP_ONLY_TESTS: string[] = [
	// '**/tests/components/expense-tree/drag.spec.ts',
];

const config: PlaywrightTestConfig<TokenTestOptions> = {
	globalSetup: require.resolve('./global-setup'),
	globalTeardown: require.resolve('./global-teardown'),
	// showing the reporter prevents turbo from caching the test results (on flakey tests)
	reporter: [['list'], ['html', { open: process.env.CI ? 'never' : 'never' }]],
	retries: 2,
	timeout: process.env.CI ? 30 * 1000 : 10 * 1000,
	maxFailures: 40,
	use: {
		storageState: 'storage-state/org-admin.json',
		headless: true,
		ignoreHTTPSErrors: true,
		bypassCSP: true,
		baseURL: process.env.PUBLIC_SITE_URL,
		// viewport: { width: 1920, height: 1080 },
		video: 'retain-on-failure',
		trace: {
			mode: 'retain-on-failure',
			screenshots: true,
			snapshots: true,
			sources: true,
		},
	},
	webServer: [
		// To Debug, use env var: DEBUG=pw:webserver
		// Build with turbo, then run preview seperately. This is to enable turbo to cache the build.
		{
			cwd: '../../',
			command:
				'pnpm turbo run build --filter=@self/backend -vvv && pnpm -F @self/backend preview',
			port: 3002,
			reuseExistingServer: !process.env.CI,
			ignoreHTTPSErrors: true,
			timeout: 60 * 1000,
			// env: { DEBUG: 'pw:webserver' },
		},
		{
			cwd: '../../',
			command:
				'pnpm turbo run build --filter=@self/site -vvv && pnpm -F @self/site preview',
			port: 3000,
			reuseExistingServer: !process.env.CI,
			ignoreHTTPSErrors: true,
			timeout: 120 * 1000,
			// env: { DEBUG: 'pw:webserver' },
		},
	],
	projects: [
		{
			name: 'site - chromium',
			testIgnore: [...NON_SITE_TESTS, ...MOBILE_ONLY_TESTS],
			use: {
				...devices['Desktop Chrome'],
				launchOptions: {
					args: ['--window-position=0,0'],
				},
			},
		},
		{
			name: 'site - firefox',
			testIgnore: [...NON_SITE_TESTS, ...MOBILE_ONLY_TESTS],
			use: devices['Desktop Firefox'],
		},
		{
			name: 'site - webkit',
			testIgnore: [...NON_SITE_TESTS, ...MOBILE_ONLY_TESTS],
			use: devices['Desktop Safari'],
		},
		{
			name: 'site - chrome - mobile',
			testIgnore: [...NON_SITE_TESTS, ...DESKTOP_ONLY_TESTS],
			use: devices['Pixel 5'],
		},
		// {
		// 	name: 'site - safari - mobile',
		// 	testIgnore: [...NON_SITE_TESTS, ...DESKTOP_ONLY_TESTS],
		// 	use: devices['iPhone 12'],
		// },
		{
			name: 'api',
			testMatch: [API_FILES],
			testIgnore: [...FILE_TESTS],
			use: {
				baseURL: process.env.PUBLIC_API_URL,
			},
		},
		{
			name: 'files',
			testMatch: [...FILE_TESTS],
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
	],
};
export default config;
