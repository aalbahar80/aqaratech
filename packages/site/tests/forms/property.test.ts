import { getAddress, getName } from '../../src/lib/utils/common.js';
import { expect, test as base } from '../config/test-setup.js';
import { preselected } from '../utils.js';
import { PropertyForm } from './form.js';

const test = base.extend<{ form: PropertyForm }>({
	form: async ({ page }, use) => {
		const form = new PropertyForm();
		form.page = page;
		await form.setupEdit();
		await use(form);
		await form.clean();
	},
});

test.use({ storageState: './config/adminStorageState.json' });

test.describe('Edit property form', async () => {
	test.beforeEach(async ({ page, form }) => {
		await page.goto(`/properties/${form.data.id}/edit`);
		await page.evaluate(() => window.started);
	});

	test('client is preselected', async ({ form, page }) => {
		const el = page.locator('#clientId');
		await preselected(page, el, getName(form.client));
	});

	test('area is preselected', async ({ form, page }) => {
		const el = page.locator('.selection');
		const selected = await el.innerText();
		expect(selected).toMatch(form.data.area);
	});
});

test('New property: preselected clientId from URL', async ({ page, form }) => {
	await page.goto(`/new/properties?clientId=${form.client.id}`);
	await page.evaluate(() => window.started);
	await preselected(page, page.locator('#clientId'), getName(form.client));
});

test.describe('new unit', async () => {
	test.beforeEach(async ({ page, form }) => {
		await page.goto(`/new/units?propertyId=${form.id}`);
		await page.evaluate(() => window.started);
	});

	test('preselected property from URL', async ({ page, form }) => {
		await preselected(page, page.locator('#propertyId'), getAddress(form.data));
	});

	test('preselected client from URL', async ({ page, form }) => {
		await preselected(page, page.locator('#clientId'), getName(form.client));
	});
});
