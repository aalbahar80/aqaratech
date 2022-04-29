import { expect, test } from '../config/test-setup.js';
import {
	ClientForm,
	ExpenseForm,
	LeaseForm,
	MaintenanceOrderForm,
	PropertyForm,
	TenantForm,
	UnitForm,
} from './form.js';

const formEntities = [
	ClientForm,
	PropertyForm,
	UnitForm,
	TenantForm,
	LeaseForm,
	ExpenseForm,
	MaintenanceOrderForm,
];

test.use({ storageState: './config/adminStorageState.json' });
for (const Form of formEntities) {
	test.describe(`Form: new ${Form.urlName}`, async () => {
		// TODO: consider deleting in an afterEach
		test.beforeEach(async ({ page }) => {
			const form = new Form(page);
			await form.setupNew();
			const url = form.getUrl('new');
			await page.goto(url);
			await page.evaluate(() => window.started);
			await form.fill();
		});

		test('able to submit after filling', async ({ page }) => {
			await page.goto(`/new/expenses`);
			await page.evaluate(() => window.started);
			const form = new ExpenseForm(page);
			const button = page.locator('button[type="submit"]');
			const el = page.locator('form');
			// const isValid = await el.getAttribute('data-test');
			expect.soft(await el.getAttribute('data-test')).toBe('ok');
			await form.fill();
			expect.soft(await el.getAttribute('data-test')).toBe('ok');
			expect.soft(await button.isEnabled()).toBe(true);
			await form.submit();
			expect(await button.isEnabled()).toBe(false);
			expect(await el.getAttribute('data-test')).toBe('ok');
		});

		test(`${Form.urlName} returns 200`, async ({ page }) => {
			const form = new Form(page);
			const request = await form.getRequest();
			const response = await request.response();
			expect(response?.status()).toBe(200);
			await page.waitForNavigation();
		});

		test(`${Form.urlName} redirects to details page`, async ({ page }) => {
			const form = new Form(page);
			await form.submit();
			await page.waitForNavigation();
			const re = new RegExp(
				`/${form.urlName}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
			);
			await expect(page).toHaveURL(re);
		});

		test(`${Form.urlName} basic details are correct`, async ({ page }) => {
			const form = new Form(page);
			await form.submit();
			await page.waitForNavigation();

			for (const b in form.basic()) {
				const el = page.locator(`text=${b}`).first();
				const re = new RegExp(`${b}`);
				expect(await el.textContent()).toMatch(re);
			}
		});
	});
}

for (const Form of formEntities) {
	test.describe(`Form: edit ${Form.urlName}`, async () => {
		// TODO: consider deleting in an afterEach
		test.beforeEach(async ({ page }) => {
			const form = new Form(page);
			await form.setup();
			const url = form.getUrl('edit');
			await page.goto(url);
			await page.evaluate(() => window.started);
			form.alter();
			await form.fill();
		});

		test(`${Form.urlName} returns 200`, async ({ page }) => {
			const form = new Form(page);
			const request = await form.getRequest();
			const response = await request.response();
			expect(response?.status()).toBe(200);
			await page.waitForNavigation();
		});

		test(`${Form.urlName} redirects to details page`, async ({ page }) => {
			const form = new Form(page);
			await form.submit();
			await page.waitForNavigation();
			const re = new RegExp(
				`/${form.urlName}/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
			);
			await expect(page).toHaveURL(re);
		});

		test(`${Form.urlName} basic details are correct`, async ({ page }) => {
			const form = new Form(page);
			await form.submit();
			await page.waitForNavigation();

			for (const b in form.basic()) {
				const el = page.locator(`text=${b}`).first();
				const re = new RegExp(`${b}`);
				expect(await el.textContent()).toMatch(re);
			}
		});
	});
}
