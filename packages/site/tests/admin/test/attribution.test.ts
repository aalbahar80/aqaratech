import { expect } from '@playwright/test';
import { getAddress, getName, getUnitLabel } from '@self/site/utils/common';
import path from 'path';
import { fileURLToPath } from 'url';
import { test as base } from '../../config.js';
import { ExpenseForm } from '../form.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

base.use({ storageState: path.resolve(__dirname, '../../adminState.json') });
const test = base.extend<{ form: ExpenseForm }>({
	form: async ({}, use) => {
		const form = new ExpenseForm();
		await form.setupEdit();
		await use(form);
	},
});

test('new: preselected client from URL', async ({ page, form }) => {
	await page.goto(`/new/expenses?clientId=${form.client.id}`);
	const el = page.locator('#clientId');
	const label = getName(form.client);
	await expect(el).toContainText(label);

	const radio = page.locator('role=radio[checked=true]');
	await expect.soft(radio).not.toHaveAttribute('aria-disabled', 'true');

	await expect.soft(radio).toContainText(label);
});

test('new: preselected property from URL', async ({ page, form }) => {
	await page.goto(`/new/expenses?propertyId=${form.property.id}`);
	const el = page.locator('#propertyId');
	const label = getAddress(form.property);
	await expect(el).toContainText(label);

	const radio = page.locator('role=radio[checked=true]');
	await expect.soft(radio).not.toHaveAttribute('aria-disabled', 'true');

	await expect.soft(radio).toContainText(label);
});

test('new: preselected unit from URL', async ({ page, form }) => {
	await page.goto(`/new/expenses?unitId=${form.unit.id}`);
	const el = page.locator('#unitId');
	const label = getUnitLabel(form.unit);
	await expect(el).toContainText(label);

	const radio = page.locator('role=radio[checked=true]');
	await expect.soft(radio).not.toHaveAttribute('aria-disabled', 'true');

	await expect.soft(radio).toContainText(label);
});

// test('edit: correct radio button is preselected', async ({ page, form }) => {
// 	await page.goto(`/expenses/${form.id}/edit`);
// 	const radio = page.locator('role=radio[checked=true]');
// 	await expect(radio).toBeVisible();
// });

// test('new: no radio option is preselected', async ({ page, form }) => {
// 	await page.goto(`/expenses/${form.id}/edit`);
// 	const radio = page.locator('role=radio[checked=true]');
// 	await expect(radio).toHaveCount(0);
// });

// test.describe('Edit expense form', async () => {
// 	test('category is preselected', async ({ form, page }) => {
// 		await page.goto(`/${form.data.id}/edit`);
// 		const el = page.locator('#category');
// 		await expect(el).toContainText(form.data.category);
// 	});

// 	test('radio is preselected', async ({ form, page }) => {
// 		await page.goto(`/${form.data.id}/edit`);
// 		const el = page.locator('.selection');
// 		const selected = await el.innerText();
// 		expect(selected).toMatch(form.data);
// 	});
// });

// ###
// test('new: preselected property from URL', async ({ page, form }) => {
// 	await page.goto(`/new/expenses?propertyId=${form.unit.id}`);
// 	const el = page.locator('#propertyId');
// 	await expect(el).toContainText(getAddress(form.property));
// });

// test('new: preselected unit from URL', async ({ page, form }) => {
// 	await page.goto(`/new/expenses?unitId=${form.unit.id}`);
// 	const el = page.locator('#unitId');
// 	await expect(el).toContainText(getUnitLabel(form.unit));
// });

// test('New expense: preselected clientId from URL', async ({
// 	page,
// 	clientForm,
// }) => {
// 	await page.goto(`/new/expenses?clientId=${clientForm.id}`);
// 	await preselected(page, page.locator('#clientId'), getName(clientForm.data));
// });

// test.describe('new unit', async () => {
// 	test.beforeEach(async ({ page, form }) => {
// 		await page.goto(`/new/units?expenseId=${form.id}`);
// 	});

// 	test('preselected expense from URL', async ({ page, form }) => {
// 		await preselected(
// 			page,
// 			page.locator('#expenseId'),
// 			getAddress(form.data),
// 		);
// 	});

// 	test('preselected client from URL', async ({ page, form }) => {
// 		await preselected(
// 			page,
// 			page.locator('#clientId'),
// 			getName(form.client),
// 		);
// 	});
// });
