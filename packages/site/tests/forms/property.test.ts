import { preselected } from '../utils.js';
import { getAddress, getName } from '../../src/lib/utils/common.js';
import { expect, test } from '../config/test-setup.js';

test.use({ storageState: './config/adminStorageState.json' });
test.describe('Edit property form', async () => {
	test.beforeEach(async ({ page, propertyForm }) => {
		await page.goto(`/properties/${propertyForm.data.id}/edit`);
		await page.evaluate(() => window.started);
	});

	test('client is preselected', async ({ propertyForm, page }) => {
		const el = page.locator('#clientId');
		await preselected(page, el, getName(propertyForm.client));
	});

	test('area is preselected', async ({ propertyForm, page }) => {
		const el = page.locator('.selection');
		const selected = await el.innerText();
		expect(selected).toMatch(propertyForm.data.area);
	});
});

test('New property: preselected clientId from URL', async ({
	page,
	clientForm,
}) => {
	await page.goto(`/new/properties?clientId=${clientForm.id}`);
	await page.evaluate(() => window.started);
	await preselected(page, page.locator('#clientId'), getName(clientForm.data));
});

test.describe('new unit', async () => {
	test.beforeEach(async ({ page, propertyForm }) => {
		await page.goto(`/new/units?propertyId=${propertyForm.id}`);
		await page.evaluate(() => window.started);
	});

	test('preselected property from URL', async ({ page, propertyForm }) => {
		await preselected(
			page,
			page.locator('#propertyId'),
			getAddress(propertyForm.data),
		);
	});

	test('preselected client from URL', async ({ page, propertyForm }) => {
		await preselected(
			page,
			page.locator('#clientId'),
			getName(propertyForm.client),
		);
	});
});
