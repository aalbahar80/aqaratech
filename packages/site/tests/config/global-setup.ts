import { chromium } from '@playwright/test';
import prisma from './prismaClient';

async function cleanupDatabase() {
	console.time('cleanup');
	await prisma.$transaction([
		prisma.$executeRaw`DELETE FROM Expense`,
		prisma.$executeRaw`DELETE FROM MaintenanceOrder`,
		prisma.$executeRaw`DELETE FROM Lease`,
		prisma.$executeRaw`DELETE FROM Unit`,
		prisma.$executeRaw`DELETE FROM Property`,
		prisma.$executeRaw`DELETE FROM Client`,
		prisma.$executeRaw`DELETE FROM Tenant`,
	]);
	console.timeEnd('cleanup');
}

async function globalSetup() {
	await cleanupDatabase();

	const adminEmail = 'admin.dev@mailthink.net';
	const password = 'test12';

	const browser = await chromium.launch();
	// log in admin
	const adminPage = await browser.newPage();
	await adminPage.goto('http://localhost:3000');
	await adminPage.locator('a:has-text("Log in")').last().click();
	await adminPage.fill('input[name="username"]', adminEmail);
	await adminPage.fill('input[name="password"]', password);
	await adminPage.locator('button[name="action"]').click();
	await adminPage.context().storageState({ path: './config/adminState.json' });
	await browser.close();
}

export default globalSetup;
