import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	// webServer: {
	// 	port: 3000,
	// 	command: 'pnpm run build && pnpm run preview',
	// },
	use: {
		headless: false,
	},
};

export default config;
