import { chromium, type FullConfig } from '@playwright/test';
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
		prisma.$executeRaw`DELETE FROM Transaction`,
	]);
	console.timeEnd('cleanup');
}

async function globalSetup(config: FullConfig) {
	await cleanupDatabase();

	const adminEmail = 'admin.dev@mailthink.net';
	const password = 'test12';

	const { baseURL, storageState } = config.projects[0].use;
	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto(baseURL!);
	await page.locator('text=Log In >> visible=true').click();
	await page.fill('input[name="username"]', adminEmail);
	await page.fill('input[name="password"]', password);
	await page.click('button[name="action"]');
	await page.context().storageState({ path: storageState as string });
	await browser.close();
}

export default globalSetup;
