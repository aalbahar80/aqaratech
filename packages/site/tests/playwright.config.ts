import type { PlaywrightTestConfig } from '@playwright/test';
import { config as baseConfig } from './config.js';
import adminConfig from './admin/playwright.config.js';
import nonAuthConfig from './non-auth/playwright.config.js';

const config: PlaywrightTestConfig = {
	...baseConfig,
	projects: [
        //@ts-ignore
        ...adminConfig.projects,
        //@ts-ignore
        ...nonAuthConfig.projects,
		{
			name: 'pay',
			testMatch: ['pay.test.ts'],
			timeout: 60 * 1000,
		},
		{
			name: 'login',
			testMatch: ['login.spec.ts'],
		},
	],
};

export default config;
