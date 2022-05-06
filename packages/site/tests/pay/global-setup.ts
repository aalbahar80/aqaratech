import type { FullConfig } from '@playwright/test';
import { cleanupDatabase, setupTenant } from '../utils.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function globalSetup(config: FullConfig) {
	await cleanupDatabase();
	await setupTenant();
}

export default globalSetup;
