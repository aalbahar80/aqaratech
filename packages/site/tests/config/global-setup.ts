import { chromium, webkit } from '@playwright/test';

async function globalSetup() {
	const adminEmail = 'admin.dev@mailthink.net';
	const password = 'test12';

	const browsers = [
		{ browser: chromium, storage: './config/adminState.json' },
		{ browser: webkit, storage: './config/adminStateWebkit.json' },
	];

	for (const b of browsers) {
		const browser = await b.browser.launch();
		// log in admin
		const adminPage = await browser.newPage();
		await adminPage.goto('http://localhost:3000');
		await adminPage.locator('a:has-text("Log in")').last().click();
		await adminPage.fill('input[name="username"]', adminEmail);
		await adminPage.fill('input[name="password"]', password);
		await adminPage.locator('button[name="action"]').click();
		await adminPage.context().storageState({ path: b.storage });
		await browser.close();
	}
}

export default globalSetup;
