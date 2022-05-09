import { expect } from '@playwright/test';
import path from 'path';
import { getAddress, getName } from '@self/site/utils/common';
import { test as base } from '../../config.js';
import { PropertyForm } from '../form.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

base.use({ storageState: path.resolve(__dirname, '../../adminState.json') });
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
