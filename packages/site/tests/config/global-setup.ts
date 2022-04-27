import { chromium } from '@playwright/test';

async function globalSetup() {
	const adminEmail = 'admin.dev@mailthink.net';
	// const ownerEmail = 'client.dev@mailthink.net';
	// const tenantEmail = 'tenant.dev@mailthink.net';
	const password = 'test12';

	const browser = await chromium.launch();

	// log in admin
	const adminPage = await browser.newPage();

	await adminPage.goto('http://localhost:3000');

	await adminPage.locator('a:has-text("Log in")').last().click();
	await adminPage.fill('input[name="username"]', adminEmail);
	await adminPage.fill('input[name="password"]', password);

	await adminPage.locator('button[name="action"]').click();

	await adminPage
		.context()
		.storageState({ path: './config/adminStorageState.json' });

	// log in owner
	// const ownerPage = await browser.newPage();

	// await ownerPage.goto('http://localhost:3000');

	// await ownerPage.locator('a:has-text("Log in")').last().click();
	// await ownerPage.fill('input[name="username"]', ownerEmail);
	// await ownerPage.fill('input[name="password"]', password);

	// await ownerPage.locator('button[name="action"]').click();

	// await ownerPage
	// 	.context()
	// 	.storageState({ path: './tests/config/ownerStorageState.json' });

	// log in tenant
	// const tenantPage = await browser.newPage();

	// await tenantPage.goto('http://localhost:3000');

	// await tenantPage.locator('a:has-text("Log in")').last().click();
	// await tenantPage.fill('input[name="username"]', tenantEmail);
	// await tenantPage.fill('input[name="password"]', password);

	// await tenantPage.locator('button[name="action"]').click();

	// await tenantPage
	// 	.context()
	// 	.storageState({ path: './tests/config/tenantStorageState.json' });

	await browser.close();
}

export default globalSetup;
