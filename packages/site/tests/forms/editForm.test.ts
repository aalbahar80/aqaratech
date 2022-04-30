import { expect, test } from '../config/test-setup.js';

test.use({ storageState: './config/adminStorageState.json' });

test.describe(`Form: edit`, async () => {
	// TODO: consider cleaning after use() in fixture
	test(`returns 200`, async ({ form, page }) => {
		const request = await form.getRequest();
		const response = await request?.response();
		expect(response?.status()).toBe(200);
		await page.waitForNavigation();
	});

	test(`redirects to details page`, async ({ form, page }) => {
		await form.submit();
		await page.waitForNavigation();
		const re = new RegExp(
			`/${form.urlName}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
		);
		await expect(page).toHaveURL(re);
	});

	test(`basic details are correct`, async ({ form, page }) => {
		await form.submit();
		await page.waitForNavigation();

		for (const b of form.basic()) {
			const el = page.locator(`text=${b}`).first();
			const re = new RegExp(`${b}`);
			expect(await el.textContent()).toMatch(re);
		}
	});
});
