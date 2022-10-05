import { devices, type PlaywrightTestConfig } from '@playwright/test';
import { config as dotenv } from 'dotenv';
import type { TokenTestOptions } from './auth/auth-fixtures';

dotenv({
	path: '../../.env',
});

const API_FILES = '**/api/**/*.spec.ts';

const config: PlaywrightTestConfig<TokenTestOptions> = {
	globalSetup: require.resolve('./global-setup'),
	reporter: [
		['list'],
		['html', { open: process.env.CI ? 'never' : 'on-failure' }],
	],
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
		{
			cwd: '../backend',
			command: 'pnpm run preview',
			port: 3002,
			reuseExistingServer: !process.env.CI,
			ignoreHTTPSErrors: true,
		},
		{
			cwd: '../site',
			// don't use `pnpm run preview` because sourcing the env file will fail in CI
			command: 'node build/index.js',
			port: 3000,
			reuseExistingServer: !process.env.CI,
			ignoreHTTPSErrors: true,
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
			use: {
				token: {
					name: 'idToken',
					value:
						'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVvSmoxaGxCdWhZZFh0NmN5bTZtMyJ9.eyJodHRwczovL2xldGFuZC5iZS9yb2xlcyI6W10sImh0dHBzOi8vbGV0YW5kLmJlL2FwcE1ldGFkYXRhIjp7fSwibmlja25hbWUiOiJvcmcuZGVtbyIsIm5hbWUiOiJvcmcuZGVtb0BtYWlsdGhpbmsubmV0IiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzU3YzBjZjAzNmM2OGM4NGJhNzY4OTRiZGRhZGI0MzFjP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGb3IucG5nIiwidXBkYXRlZF9hdCI6IjIwMjItMDktMjlUMDM6MDU6NTkuNTMyWiIsImVtYWlsIjoib3JnLmRlbW9AbWFpbHRoaW5rLm5ldCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9kZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYyZTE0MzkyYTE0OWIyNzZkZDE3N2QzZiIsImF1ZCI6Ino2b3F5T3VQTGFvNlhoSmVDamU5dFo4WmJpSmE1emN0IiwiaWF0IjoxNjY0NDU3NjU5LCJleHAiOjE2NjQ0OTM2NTksInNpZCI6IjNWdFZ1M1J4QnVKT3VENm92bG92ZlUteHNmbzFoVDJEIn0.C0BAlhjoOelRWuCDquv0L_FLKp-y1nJYJcmFbvHnnqSlZZoEECo2B_qBpRp7VlWLnVE98dORvtPgNrNQRL1fwMMLC4tOIYoFZMWzdoAu651p1qOe8Ic8t-qLHES0v8PY1qIgquFsyeH3dprCgFzTD92b7bPllYz8klkkDljE0c3u-cMfZfTW0_zSz1xXWS5W8HGY-w1JMzD8JYPX5RPexS6OGCsXcT1PM2gfeNw_MKfKAHW0sn87F5w67axaPbD19pzREOXVdULK23lWtyuXqfSluPlLFDq-OufoDf5gfHiiXQY7VHImXAGh8fHuP2a52QoRBOUw5GqkotejYy0yww',
				},
			},
		},
		{
			name: 'accessToken',
			testMatch: '**/token/**/*.spec.ts',
			use: {
				token: {
					name: 'accessToken',
					value:
						'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVvSmoxaGxCdWhZZFh0NmN5bTZtMyJ9.eyJodHRwczovL2xldGFuZC5iZS9lbWFpbCI6Im9yZy5kZW1vQG1haWx0aGluay5uZXQiLCJodHRwczovL2xldGFuZC5iZS9yb2xlcyI6W10sImh0dHBzOi8vbGV0YW5kLmJlL2FwcE1ldGFkYXRhIjp7fSwiaXNzIjoiaHR0cHM6Ly9kZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYyZTE0MzkyYTE0OWIyNzZkZDE3N2QzZiIsImF1ZCI6WyJsZXRhbmQuYmUvYXBpIiwiaHR0cHM6Ly9kZXYtZWVodmhkcDIuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY2NDQ1NzY1OSwiZXhwIjoxNjY0NTQ0MDU5LCJhenAiOiJ6Nm9xeU91UExhbzZYaEplQ2plOXRaOFpiaUphNXpjdCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.q2m3BFdfM574FzUNQ7gPEPXxDKtsu-bRIFWHWR00jJz60pmAB8hhb1OKJjEUnP5_oj9_-8V160kIYRrd_he6SLIVjf-pgEKXsHFpjlp8GJQE4964Y6AzfLWMShdDWF0HZrPuyi6zyAnwd6DGo-M-B25aH81fO6GseYdfm97i9-eZq3HJTi8r_lokYmwnxP42uWJJPDefh8FRPKQzBC-99cZpXm81Rw26SwcoYtiv8K6NXXRkg_1iGAS2oBsYR6drN2wFpKJgZl8ye2PDUDFFZ6P2TrTWBty6Vb0CBSwjzKSHeXrFFGRXFN6ra4XKerBguIujJYIqsiK0qcUaR6gRTA',
				},
			},
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
