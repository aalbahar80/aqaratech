import { expect } from '@playwright/test';
import { getAddress, getName } from '@self/site/utils/common';
import path from 'path';
import { fileURLToPath } from 'url';
import { test as base } from '../../config.js';
import { PropertyForm } from '../form.js';

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

test.describe('new unit', async () => {
	test.beforeEach(async ({ page, form }) => {
		await page.goto(`/new/units?propertyId=${form.id}`);
	});

	test('preselected client from URL', async ({ page, form }) => {
		const el = page.locator('#clientId');
		await expect(el).toContainText(getName(form.client));
	});

	test('preselected property from URL', async ({ page, form }) => {
		const el = page.locator('#propertyId');
		await expect(el).toContainText(getAddress(form.data));
	});
});
