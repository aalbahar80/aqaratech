import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	// webServer: {
	// 	port: 3000,
	// 	command: 'pnpm run build && pnpm run preview',
	// },
	// globalSetup: './tests/config/global-setup.ts',
	use: {
		// headless: false,
		trace: 'retain-on-failure',
	},
};

export default config;
