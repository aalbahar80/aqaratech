import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	// webServer: {
	// 	port: 3000,
	// 	command: 'pnpm run build && pnpm run preview',
	// },
	// globalSetup: './tests/config/global-setup.ts',
	timeout: 10000,
	use: {
		// headless: false,
		trace: 'retain-on-failure',
		baseURL: 'http://localhost:3000',
		launchOptions: {
			args: [
				'--window-position=3840,500',
				// '--window-size="3840,5000"',
				// '--window-size=1500,1500',
			],
		},
	},
};

export default config;
