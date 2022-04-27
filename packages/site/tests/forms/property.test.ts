import { preselected } from '../utils.js';
import { getName } from '../../src/lib/utils/common.js';
import { expect, test } from '../config/test-setup.js';

test.use({ storageState: './config/adminStorageState.json' });

test.describe(`New property form`, async () => {
	test.beforeEach(async ({ page, propertyForm }) => {
		await page.goto('/new/properties');
		// @ts-ignore
		await page.evaluate(() => window.started); // waits for hydration
		await propertyForm.fill();
	});

	test('returns a status of 200', async ({ propertyForm }) => {
		const request = await propertyForm.getRequest();
		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	test('redirects to property detail page', async ({ page, propertyForm }) => {
		await propertyForm.submit();

		const re = new RegExp(
			`/properties/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
		);
		await expect(page).toHaveURL(re);
	});

	test('some details are correct', async ({ propertyForm, page }) => {
		await propertyForm.submit();
		await page.waitForNavigation();

		const el = page.locator(`text=${propertyForm.data.area}`).first();
		const re = new RegExp(`${propertyForm.data.area}`);
		expect(await el.textContent()).toMatch(re);
	});
});

test.describe('Edit property form', async () => {
	test.beforeEach(async ({ page, propertyForm }) => {
		await page.goto(`/properties/${propertyForm.data.id}/edit`);
		// @ts-ignore
		await page.evaluate(() => window.started); // waits for hydration
	});

	test('client is preselected', async ({ propertyForm, page }) => {
		const el = page.locator('#clientId');
		await preselected(page, el, getName(propertyForm.client));
	});

	test('area is preselected', async ({ propertyForm, page }) => {
		const el = page.locator('.selection');
		const selected = await el.evaluate((el: HTMLDivElement) => el.innerText);
		expect(selected).toMatch(propertyForm.data.area);
	});
});

test('preselected clientId from URL', async ({ page, clientForm }) => {
	await page.goto(`/new/properties?clientId=${clientForm.id}`);
	// @ts-ignore
	await page.evaluate(() => window.started); // waits for hydration
	await preselected(page, page.locator('#clientId'), getName(clientForm.data));
});
