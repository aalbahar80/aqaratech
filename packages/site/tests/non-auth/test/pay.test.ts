import { expect, test as base, type Page } from '@playwright/test';
import { testTenantId } from '../../../../seed/generators.js';
import { setupLease, setupTrx } from '../setup.js';

const fill = async (page: Page, success = true) => {
	await page
		.locator(
			'text=Select Your Bank: Select Your Bank Ahli United Bank [AUB] Al Ahli Bank of Kuwait >> select',
		)
		.selectOption('201825717889145|Knet Test Card [KNET1]|0.000');
	await page.locator('input[name="debitNumber"]').fill('0000000001');
	await page
		.locator('select')
		.nth(2)
		.selectOption(success ? '9' : '1');
	await page.locator('select').nth(3).selectOption('2025');
	await page.locator('input[name="cardPin"]').fill('1111');
	await page.locator('text=Submit').click();
	await page.locator('input:has-text("Confirm")').click();
};

const test = base.extend<{ trxId: string }>({
	trxId: async ({}, use) => {
		const leaseId = await setupLease(testTenantId);
		const trxId = await setupTrx(leaseId);
		await use(trxId);
	},
});

test('indicate payment success', async ({ page, trxId }) => {
	await page.goto(`/p/transactions/${trxId}`);
	await Promise.all([
		page.waitForNavigation(),
		page.locator('text=Pay').click(),
	]);
	await fill(page);

	const badge = page.locator('id=badge');
	await expect.soft(badge).toHaveText('Paid');
	await expect.soft(badge).toHaveClass(/green/);

	const toasts = page.locator('id=toasts');
	await expect.soft(toasts).toContainText('Payment successful');

	// check that searchParams are unset
	await expect(page).toHaveURL(/^((?!success=).)*$/);
});

test('indicate payment failure', async ({ page, trxId }) => {
	// test.slow(true, 'failed payments are slow on myfatoorah');
	await page.goto(`/p/transactions/${trxId}`);
	await Promise.all([
		page.waitForNavigation(),
		page.locator('text=Pay').click(),
	]);
	await fill(page, false);

	const badge = page.locator('id=badge');
	await expect.soft(badge).not.toHaveText('Paid', { timeout: 25000 });
	await expect.soft(badge).not.toHaveClass(/green/, { timeout: 25000 });

	const toasts = page.locator('id=toasts');
	await expect.soft(toasts).toContainText('Payment failed');

	// check that searchParams are unset
	await expect.soft(page).toHaveURL(/^((?!success=).)*$/);

	const btn = page.locator('button:has-text("Pay")');
	await expect.soft(btn).toBeVisible();
});

// test('portal shows correct payment status', async ({ page, trxId }) => {
// 	// Login
// 	await page.goto('/');
// 	await page.locator('text=Log In >> visible=true').click();

// 	await page.fill('input[name="username"]', testTenantEmail);
// 	await page.fill('input[name="password"]', testTenantPassword);
// 	await page.locator('button[name="action"]').click();

// 	// TODO: replace with proper hydration check
// 	await page.goto(`/portal/tenant/${testTenantId}`);
// 	await page.click('text=Pay');

// 	// Pay
// 	await Promise.all([
// 		page.waitForNavigation(),
// 		page.locator('text=Pay').click(),
// 	]);
// 	await page
// 		.locator(
// 			'text=Select Your Bank: Select Your Bank Ahli United Bank [AUB] Al Ahli Bank of Kuwait >> select',
// 		)
// 		.selectOption('201825717889145|Knet Test Card [KNET1]|0.000');
// 	await page.locator('input[name="debitNumber"]').fill('0000000001');
// 	await page.locator('select').nth(2).selectOption('9');
// 	await page.locator('select').nth(3).selectOption('2025');
// 	await page.locator('input[name="cardPin"]').fill('1111');
// 	await page.locator('text=Submit').click();
// 	await page.locator('input:has-text("Confirm")').click();
// 	const trxList = page.locator('ul#trxList');
// 	await expect.soft(trxList).toBeVisible();

// 	// Confirm
// 	const card = page.locator(`id=${trxId}`);
// 	await expect.soft(card).toBeVisible();
// 	await expect.soft(card).toHaveClass(/isPaid/);
// 	await expect.soft(card).not.toContainText(/Pay/i);
// });
