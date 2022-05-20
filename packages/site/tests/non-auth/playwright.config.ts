import type { PlaywrightTestConfig } from '@playwright/test';
import { config as baseConfig } from '../config.js';

const config: PlaywrightTestConfig = {
	...baseConfig,
	projects: [
		// {
		// 	name: 'pay',
		// 	testMatch: ['pay.test.ts'],
		// 	timeout: 60 * 1000,
		// 	retries: 0, // until mocking
		// },
		{
			name: 'login',
			testMatch: ['login.spec.ts'],
		},
	],
};

export default config;
