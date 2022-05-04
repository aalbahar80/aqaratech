import { getAddress, getName } from '../../src/lib/utils/common.js';
import { expect, test as base } from '../config/test-setup.js';
import { PropertyForm } from './form.js';

base.use({ storageState: './config/adminState.json' });
const test = base.extend<{ form: PropertyForm }>({
	form: async ({}, use) => {
		const form = new PropertyForm();
		await form.setupEdit();
		await use(form);
	},
});

test.describe('Edit property form', async () => {
	test.beforeEach(async ({ page, form }) => {
		await page.goto(`/properties/${form.data.id}/edit`);
	});

	test('client is preselected', async ({ form, page }) => {
		const el = page.locator('#clientId');
		await expect(el).toContainText(getName(form.client));
	});

	test('area is preselected', async ({ form, page }) => {
		const el = page.locator('.selection');
		await expect(el).toContainText(form.data.area);
	});
});

test('New property: preselected clientId from URL', async ({ page, form }) => {
	await page.goto(`/new/properties?clientId=${form.client.id}`);
	const el = page.locator('#clientId');
	await expect(el).toContainText(getName(form.client));
});

test.describe('new unit', async () => {
	test.beforeEach(async ({ page, form }) => {
		await page.goto(`/new/units?propertyId=${form.id}`);
	});

	test('preselected property from URL', async ({ page, form }) => {
		const el = page.locator('#propertyId');
		await expect(el).toContainText(getAddress(form.data));
	});

	test('preselected client from URL', async ({ page, form }) => {
		const el = page.locator('#clientId');
		await expect(el).toContainText(getName(form.client));
	});
});
