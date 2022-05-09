// import { expect } from '@playwright/test';
// import path from 'path';
// import {
// 	getAddress,
// 	getName,
// 	getUnitLabel,
// } from '../../../src/lib/utils/common.js';
// import { test as base } from '../../config.js';
// import { ExpenseForm } from '../form.js';

// base.use({ storageState: path.resolve(__dirname, '../../adminState.json') });
// test.describe('Edit expense form', async () => {
// 	test.beforeEach(async ({ page, expenseForm }) => {
// 		await page.goto(`/${expenseForm.data.id}/edit`);
// 	});

// 	test('category is preselected', async ({ expenseForm, page }) => {
// 		const el = page.locator('#category');
// 		await preselected(page, el, expenseForm.data.category);
// 	});

// test('radio is preselected', async ({ expenseForm, page }) => {
// 	const el = page.locator('.selection');
// 	const selected = await el.innerText();
// 	expect(selected).toMatch(expenseForm.data);
// });
// });

// test('New expense: preselected clientId from URL', async ({
// 	page,
// 	clientForm,
// }) => {
// 	await page.goto(`/new/properties?clientId=${clientForm.id}`);
// 	await preselected(page, page.locator('#clientId'), getName(clientForm.data));
// });

// test.describe('new unit', async () => {
// 	test.beforeEach(async ({ page, expenseForm }) => {
// 		await page.goto(`/new/units?expenseId=${expenseForm.id}`);
// 	});

// test('preselected expense from URL', async ({ page, expenseForm }) => {
// 	await preselected(
// 		page,
// 		page.locator('#expenseId'),
// 		getAddress(expenseForm.data),
// 	);
// });

// 	test('preselected client from URL', async ({ page, expenseForm }) => {
// 		await preselected(
// 			page,
// 			page.locator('#clientId'),
// 			getName(expenseForm.client),
// 		);
// 	});
// });

// test('able to submit', async ({ page }) => {
// 	await page.goto(`/new/expenses`);
// 	const form = new ExpenseForm(page);
// 	const button = page.locator('button[type="submit"]');
// 	const el = page.locator('form');
// 	// const isValid = await el.getAttribute('data-test');
// 	expect.soft(await el.getAttribute('data-test')).toBe('ok');
// 	await form.fill();
// 	expect.soft(await el.getAttribute('data-test')).toBe('ok');
// 	expect.soft(await button.isEnabled()).toBe(true);
// 	await form.submit();
// 	expect(await button.isEnabled()).toBe(false);
// 	expect(await el.getAttribute('data-test')).toBe('ok');
// });
