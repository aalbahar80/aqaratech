import { expect } from '@playwright/test';
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

test.describe('Edit property form', async () => {
	test.beforeEach(async ({ page, form }) => {
		await page.goto(`/properties/${form.data.id}/edit`);
	});

	test('portfolio is preselected', async ({ form, page }) => {
		const el = page.locator('#portfolioId');
		await expect(el).toContainText(form.portfolio.fullName);
	});

	test('area is preselected', async ({ form, page }) => {
		const el = page.locator('.selection');
		await expect(el).toContainText(form.data.area);
	});
});

test('New property: preselected portfolioId from URL', async ({
	page,
	form,
}) => {
	await page.goto(`/new/properties?portfolioId=${form.portfolio.id}`);
	const el = page.locator('#portfolioId');
	await expect(el).toContainText(form.portfolio.fullName);
});
