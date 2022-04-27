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

	test('returns a 200 response', async ({ propertyForm }) => {
		propertyForm.alter();
		await propertyForm.fill();
		const request = await propertyForm.getRequest();
		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	test('redirects to property detail page', async ({ page, propertyForm }) => {
		await propertyForm.submit();
		await page.waitForNavigation();
		await expect(page).toHaveURL(`/properties/${propertyForm.data.id}`);
	});

	test('some details are correct', async ({ propertyForm, page }) => {
		await propertyForm.submit();
		await page.waitForNavigation();

		const el = page.locator(`text=${propertyForm.data.area}`).first();
		const re = new RegExp(`${propertyForm.data.area}`);
		expect(await el.textContent()).toMatch(re);
	});
});
