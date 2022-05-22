import { expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';
import {
	getAddress,
	getName,
	getUnitLabel,
} from '../../../src/lib/utils/common.js';
import { test as base } from '../../config.js';
import { LeaseForm } from '../form.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

base.use({ storageState: path.resolve(__dirname, '../../adminState.json') });
const test = base.extend<{ form: LeaseForm }>({
	form: async ({}, use) => {
		const form = new LeaseForm();
		await form.setupEdit();
		await use(form);
	},
});

test('new lease: preselected client from URL', async ({ page, form }) => {
	await page.goto(`/new/leases?unitId=${form.unit.id}`);
	const el = page.locator('#clientId');
	await expect(el).toContainText(getName(form.client));
});

test('new lease: preselected property from URL', async ({ page, form }) => {
	await page.goto(`/new/leases?unitId=${form.unit.id}`);
	const el = page.locator('#propertyId');
	await expect(el).toContainText(getAddress(form.property));
});

test('new lease: preselected unit from URL', async ({ page, form }) => {
	await page.goto(`/new/leases?unitId=${form.unit.id}`);
	const el = page.locator('#unitId');
	await expect(el).toContainText(getUnitLabel(form.unit));
});

test('new lease: preselected tenant from URL', async ({ page, form }) => {
	await page.goto(`/new/leases?tenantId=${form.tenant.id}`);
	const el = page.locator('#tenantId');
	await expect(el).toContainText(getName(form.tenant));
});

test.describe('edit lease', async () => {
	test.beforeEach(async ({ page, form }) => {
		await page.goto(`/leases/${form.id}/edit`);
	});

	test('client is preselected', async ({ page, form }) => {
		const el = page.locator('#clientId');
		await expect(el).toContainText(getName(form.client));
	});

	test('property is preselected', async ({ page, form }) => {
		const el = page.locator('#propertyId');
		await expect(el).toContainText(getAddress(form.property));
	});

	test('unit is preselected', async ({ page, form }) => {
		const el = page.locator('#unitId');
		await expect(el).toContainText(getUnitLabel(form.unit));
	});

	test('tenant is preselected', async ({ page, form }) => {
		const el = page.locator('#tenantId');
		await expect(el).toContainText(getName(form.tenant));
	});
});
