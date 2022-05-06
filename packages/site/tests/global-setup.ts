import { chromium, type FullConfig } from '@playwright/test';
import path from 'path';

async function globalSetup(config: FullConfig) {
	const adminEmail = 'admin.dev@mailthink.net';
	const password = 'test12';

	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto('http://localhost:3000');
	await page.locator('text=Log In >> visible=true').click();
	await page.fill('input[name="username"]', adminEmail);
	await page.fill('input[name="password"]', password);
	await page.click('button[name="action"]');
	await page
		.context()
		.storageState({ path: path.resolve(__dirname, 'adminState.json') });
	await browser.close();
}

export default globalSetup;
