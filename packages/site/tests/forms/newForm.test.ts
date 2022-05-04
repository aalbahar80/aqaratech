import { expect, test as base } from '../config/test-setup.js';
import type { FormFixtures } from '../playwright.config.js';
import { formClasses, type FormType } from './form.js';

const test = base.extend<FormFixtures & { form: FormType }>({
	form: async ({ page, baseForm }, use) => {
		const form = new formClasses[baseForm]();
		form.page = page;
		await form.setupNew();
		const url = form.getUrl('new');
		await page.goto(url);
		await form.fill();
		await use(form);
	},
});

test(`returns 200`, async ({ form }) => {
	const request = await form.getRequest();
	const response = await request?.response();
	expect(response?.status()).toBe(200);
});

// test(`redirects to details page`, async ({ form, page }) => {
// 	await form.submit();
// 	const re = new RegExp(
// 		`/${form.urlName}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
// 	);
// 	await expect(page).toHaveURL(re);
// });

test(`basic details are correct`, async ({ form, page }) => {
	await form.submit();
	await page.waitForURL(/^((?!new).)*$/);

	for (const b of form.basic()) {
		const el = page.locator(`text=${b}`).first();
		const re = new RegExp(`${b}`);
		await expect(el).toContainText(re);
	}
});

test('able to submit after filling', async ({ page, form }) => {
	const button = page.locator('button[type="submit"]');
	const el = page.locator('form'); // move next to usage?
	await expect.soft(button).toBeEnabled();
	await form.submit();
	await expect(button).not.toBeEnabled();
	await expect(el).toHaveAttribute('data-test', 'ok');
});
