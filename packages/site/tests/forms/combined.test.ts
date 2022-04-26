import { ClientForm, PropertyForm } from './form.js';
import { expect, test } from '../config/test-setup.js';

test.use({ storageState: './tests/config/adminStorageState.json' });

// test('new forms return 200', async ({ page, clientForm, propertyForm }) => {
// 	const forms = [clientForm, propertyForm];
// 	forms.forEach(async (form) => {
// 		test(`${form.urlName} form`, async () => {
// 			await page.goto(form.createUrl);
// 			// @ts-ignore
// 			await page.evaluate(() => window.started); // waits for hydration
// 			await propertyForm.fill();

// 			const request = await form.getRequest();
// 			const response = await request.response();
// 			expect(response?.status()).toBe(200);
// 		});
// 	});
// });

test.describe('new forms', async () => {
	const forms = [ClientForm, PropertyForm];
	forms.forEach(async (formType, idx) => {
		test(`New ${formType.urlName2} form returns 200`, async ({
			page,
			forms,
		}) => {
			const form = forms[idx];
			await page.goto(form.createUrl);
			// @ts-ignore
			await page.evaluate(() => window.started); // waits for hydration
			await form.fill();

			const request = await form.getRequest();
			const response = await request.response();
			expect(response?.status()).toBe(200);
		});
	});
});

// test('forms redirect to detail page', async ({
// 	page,
// 	clientForm,
// 	propertyForm,
// }) => {
// 	const forms = [clientForm, propertyForm];
// 	forms.forEach(async (form) => {
// 		await page.goto(form.createUrl);
// 		// @ts-ignore
// 		await page.evaluate(() => window.started); // waits for hydration
// 		await propertyForm.fill();
// 		await propertyForm.submit();

// 		const re = new RegExp(
// 			`/${form.urlName}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
// 		);
// 		await expect(page).toHaveURL(re);
// 	});
// });
