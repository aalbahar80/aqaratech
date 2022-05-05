import type { FullConfig } from '@playwright/test';
import { setupTenant } from './setup.js';
import { cleanupDatabase } from '../utils.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function globalSetup(config: FullConfig) {
	await cleanupDatabase();
	await setupTenant();
}

export default globalSetup;
