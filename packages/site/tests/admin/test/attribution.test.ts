import { expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import {
	getAddress,
	getName,
	getUnitLabel,
} from '../../../package/utils/common.js';
import { test as base } from '../../config.js';
import {
	ExpenseForm,
	formClasses,
	MaintenanceOrderForm,
	type FormType,
} from '../form.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const attributionFormClasses = {
	expenses: ExpenseForm,
	maintenanceOrders: MaintenanceOrderForm,
} as const;

type AttributionFormType = Extract<
	FormType,
	ExpenseForm | MaintenanceOrderForm
>;
type AttributionFormFixtures = {
	baseForm: keyof typeof attributionFormClasses;
};

base.use({ storageState: path.resolve(__dirname, '../../adminState.json') });
const test = base.extend<
	AttributionFormFixtures & { form: AttributionFormType }
>({
	form: async ({ baseForm }, use) => {
		const form = new formClasses[baseForm]();
		await use(form);
	},
	baseForm: ['expenses', { option: true }],
});

test('new: no radio option is preselected', async ({ page, form }) => {
	await page.goto(`new/${form.urlName}`);
	const radio = page.locator('role=radio[checked=true]');
	await expect(radio).toHaveCount(0);
});

test('new: preselected client from URL', async ({ page, form }) => {
	await form.setupEdit();
	await page.goto(`/new/${form.urlName}?clientId=${form.client.id}`);
	const el = page.locator('#clientId');
	const label = getName(form.client);
	await expect(el).toContainText(label);

	const radio = page.locator('role=radio[checked=true]');
	await expect.soft(radio).not.toHaveAttribute('aria-disabled', 'true');

	await expect.soft(radio).toContainText(label);
});

test('new: preselected property from URL', async ({ page, form }) => {
	await form.setupEdit();
	await page.goto(`/new/${form.urlName}?propertyId=${form.property.id}`);
	const el = page.locator('#propertyId');
	const label = getAddress(form.property);
	await expect(el).toContainText(label);

	const radio = page.locator('role=radio[checked=true]');
	await expect.soft(radio).not.toHaveAttribute('aria-disabled', 'true');

	await expect.soft(radio).toContainText(label);
});

test('new: preselected unit from URL', async ({ page, form }) => {
	await form.setupEdit();
	await page.goto(`/new/${form.urlName}?unitId=${form.unit.id}`);
	const el = page.locator('#unitId');
	const label = getUnitLabel(form.unit);
	await expect(el).toContainText(label);

	const radio = page.locator('role=radio[checked=true]');
	await expect.soft(radio).not.toHaveAttribute('aria-disabled', 'true');

	await expect.soft(radio).toContainText(label);
});

test('edit: preselected unit', async ({ page, form }) => {
	await form.setupEdit('unit');
	await page.goto(`/${form.urlName}/${form.data.id}/edit`);

	const el = page.locator('#unitId');
	const label = getUnitLabel(form.unit);
	await expect(el).toContainText(label);

	const radio = page.locator('role=radio[checked=true]');
	await expect.soft(radio).not.toHaveAttribute('aria-disabled', 'true');

	await expect.soft(radio).toContainText(label);
});

test('edit: preselected property', async ({ page, form }) => {
	await form.setupEdit('property');
	await page.goto(`/${form.urlName}/${form.data.id}/edit`);

	const el = page.locator('#propertyId');
	const label = getAddress(form.property);
	await expect(el).toContainText(label);

	const radio = page.locator('role=radio[checked=true]');
	await expect.soft(radio).not.toHaveAttribute('aria-disabled', 'true');

	await expect.soft(radio).toContainText(label);
});

test('edit: preselected client', async ({ page, form }) => {
	await form.setupEdit('client');
	await page.goto(`/${form.urlName}/${form.data.id}/edit`);

	const el = page.locator('#clientId');
	const label = getName(form.client);
	await expect(el).toContainText(label);

	const radio = page.locator('role=radio[checked=true]');
	await expect.soft(radio).not.toHaveAttribute('aria-disabled', 'true');

	await expect.soft(radio).toContainText(label);
});

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
