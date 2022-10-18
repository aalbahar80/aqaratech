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

const config: PlaywrightTestConfig<TokenTestOptions> = {
	globalSetup: require.resolve('./global-setup'),
	globalTeardown: require.resolve('./global-teardown'),
	// showing the reporter prevents turbo from caching the test results (on flakey tests)
	reporter: [['list'], ['html', { open: process.env.CI ? 'never' : 'never' }]],
	retries: 2,
	timeout: process.env.CI ? 30 * 1000 : 5 * 1000,
	maxFailures: 20,
	grepInvert: [/smoke/],
	use: {
		storageState: 'storageState.json',
		headless: true,
		ignoreHTTPSErrors: true,
		bypassCSP: true,
		video: 'on-first-retry',
		baseURL: process.env.PUBLIC_SITE_URL,
		viewport: { width: 1920, height: 1080 },
		trace: {
			mode: 'on',
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
			// env: { DEBUG: 'pw:webserver' },
		},
		{
			cwd: '../../',
			command:
				'pnpm turbo run build --filter=@self/site -vvv && pnpm -F @self/site preview',
			port: 3000,
			reuseExistingServer: !process.env.CI,
			ignoreHTTPSErrors: true,
			// env: { DEBUG: 'pw:webserver' },
		},
	],
	projects: [
		{
			name: 'chromium',
			testIgnore: [API_FILES],
			use: {
				...devices['Desktop Chrome'],
				launchOptions: {
					args: ['--window-position=0,0'],
				},
			},
		},
		{
			name: 'api',
			testMatch: [API_FILES],
			use: {
				baseURL: process.env.PUBLIC_API_URL,
			},
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
		// {
		// add browser to ci.yml if enabling, consider installing default browsers if github actions properly caches them
		// 	name: "firefox",
		// 	use: { ...devices["Desktop Firefox"] },
		// 	testIgnore: ["**/api/**"],
		// },
		// {
		// 	name: "pixel5",
		// 	use: { ...devices["Pixel 5"], isMobile: true },
		// 	testIgnore: ["**/api/**"],
		// },
		// {
		// 	// requires https
		// 	name: "iphone",
		// 	use: {
		// 		...devices["iPhone 8"],
		// 		isMobile: true,
		// 	},
		// 	testIgnore: ["**/api/**"],
		// },
		// {
		// 	// requires https, run with npx vite dev --https, and use basicSslplugin, set .env vars to https.
		// 	// STATUS: blocked by cors (backend is http while site is https)
		// 	// https://vitejs.dev/guide/migration.html#automatic-https-certificate-generation
		// 	name: "safari",
		// 	use: { ...devices["Desktop Safari"] },
		// 	testIgnore: ["**/api/**"],
		// 	timeout: 30 * 1000,
		// },
	],
};
export default config;
