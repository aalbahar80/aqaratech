import { ClientForm, PropertyForm } from './form.js';
import { expect, test } from '../config/test-setup.js';

test.use({ storageState: './tests/config/adminStorageState.json' });

test.describe('New form', async () => {
	const forms = [ClientForm, PropertyForm];
	forms.forEach(async (formType, idx) => {
		test(`${formType.urlName2} returns 200`, async ({ page, forms }) => {
			const form = forms[idx];
			await page.goto(form.createUrl);
			// @ts-ignore
			await page.evaluate(() => window.started); // waits for hydration
			await form.fill();

			const request = await form.getRequest();
			const response = await request.response();
			expect(response?.status()).toBe(200);
		});

		test(`${formType.urlName2} redirects to detail page`, async ({
			page,
			forms,
		}) => {
			const form = forms[idx];
			await page.goto(form.createUrl);
			// @ts-ignore
			await page.evaluate(() => window.started); // waits for hydration
			await form.fill();

			await form.submit();
			const re = new RegExp(
				`/${form.urlName}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
			);
			await expect(page).toHaveURL(re);
		});

		test(`${formType.urlName2} some details are correct`, async ({
			page,
			forms,
		}) => {
			const form = forms[idx];
			await page.goto(form.createUrl);
			// @ts-ignore
			await page.evaluate(() => window.started); // waits for hydration
			await form.fill();

			await form.submit();
			await page.waitForNavigation();

			form.basic().forEach(async (b) => {
				const el = page.locator(`text=${b}`).first();
				const re = new RegExp(`${b}`);
				expect(await el.textContent()).toMatch(re);
			});
		});
	});
});
