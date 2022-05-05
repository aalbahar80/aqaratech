import { expect, test as base } from '@playwright/test';
import {
	testTenantEmail,
	testTenantId,
	testTenantPassword,
} from '../../../../seed/generators.js';
import { setupLease, setupTrx } from '../setup.js';

const test = base.extend<{ trxId: string }>({
	trxId: async ({}, use) => {
		const leaseId = await setupLease(testTenantId);
		const trxId = await setupTrx(leaseId);
		await use(trxId);
	},
});

test('tenant can pay', async ({ page, trxId }) => {
	// Login
	await page.goto('/');
	await page.locator('text=Log In >> visible=true').click();

	await page.fill('input[name="username"]', testTenantEmail);
	await page.fill('input[name="password"]', testTenantPassword);
	await page.locator('button[name="action"]').click();

	// TODO: replace with proper hydration check
	await page.goto(`/portal/tenant/${testTenantId}`);
	await page.click('text=Pay');

	// Pay
	await Promise.all([
		page.waitForNavigation(),
		page.locator('text=Pay').click(),
	]);
	await page
		.locator(
			'text=Select Your Bank: Select Your Bank Ahli United Bank [AUB] Al Ahli Bank of Kuwait >> select',
		)
		.selectOption('201825717889145|Knet Test Card [KNET1]|0.000');
	await page.locator('input[name="debitNumber"]').fill('0000000001');
	await page.locator('select').nth(2).selectOption('9');
	await page.locator('select').nth(3).selectOption('2025');
	await page.locator('input[name="cardPin"]').fill('1111');
	await page.locator('text=Submit').click();
	await page.locator('input:has-text("Confirm")').click();
	const trxList = page.locator('ul#trxList');
	await expect.soft(trxList).toBeVisible();

	// Confirm
	const card = page.locator(`id=${trxId}`);
	await expect.soft(card).toBeVisible();
	await expect.soft(card).toHaveClass(/isPaid/);
	await expect.soft(card).not.toContainText(/Pay/i);
});
