import { ClientForm, PropertyForm, UnitForm } from './form.js';
import { expect, test } from '../config/test-setup.js';

test.use({ storageState: './config/adminStorageState.json' });

const formEntities = [ClientForm, PropertyForm, UnitForm];
const types = ['new', 'edit'] as const;
const forms = formEntities.flatMap((form, idx) =>
	types.map((type) => ({ form, type, idx })),
);

test.describe('Form', async () => {
	forms.forEach(async (formType) => {
		test(`${formType.type} ${formType.form.urlName} returns 200`, async ({
			page,
			forms,
		}) => {
			const form = forms[formType.idx];
			await page.goto(form.getUrl(formType.type));
			// @ts-ignore
			await page.evaluate(() => window.started); // waits for hydration
			await form.fill();

			const request = await form.getRequest();
			const response = await request.response();
			expect(response?.status()).toBe(200);
		});

		test(`${formType.type} ${formType.form.urlName} redirects to detail page`, async ({
			page,
			forms,
		}) => {
			const form = forms[formType.idx];
			await page.goto(form.getUrl(formType.type));
			// @ts-ignore
			await page.evaluate(() => window.started); // waits for hydration
			await form.fill();

			await form.submit();
			const re = new RegExp(
				`/${form.urlName}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
			);
			await expect(page).toHaveURL(re);
		});

		test(`${formType.type} ${formType.form.urlName} some details are correct`, async ({
			page,
			forms,
		}) => {
			const form = forms[formType.idx];
			await page.goto(form.getUrl(formType.type));
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
