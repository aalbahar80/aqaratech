import type { Page } from '@playwright/test';
import { v4 as uuid } from 'uuid';
import { fakeClient, fakeProperty } from '../../../seed/generators.js';
import { getName } from '../../src/lib/utils/common.js';
import { expect, test as base } from '../config/test-setup.js';
import { Form } from './form.js';

class PropertyForm extends Form {
	constructor(
		page: Page,
		public data = fakeProperty(),
		public client = fakeClient(),
	) {
		super(page);
	}

	public async fill() {
		await this.page.fill('[id="area"]', this.data.area);
		await this.page.locator(`.item >> text=${this.data.area}`).click();
		await this.page.keyboard.press('Enter');
		await this.page.fill('input[name="block"]', this.data.block);
		await this.page.fill('input[name="street"]', this.data.street);
		await this.page.fill('input[name="avenue"]', this.data.avenue ?? '');
		await this.page.fill('input[name="number"]', this.data.number);
		await this.page.selectOption('#clientId', { label: getName(this.client) });
	}

	public alter() {
		this.data = {
			...fakeProperty(),
			id: this.data.id,
		};
	}
}

base.use({ storageState: './tests/config/adminStorageState.json' });

const test = base.extend<{ propertyForm: PropertyForm }>({
	propertyForm: async ({ page, trpcClient }, use) => {
		// override faker's id beacuse this sometimes returns the same data twice
		const client = { ...fakeClient(), id: uuid() };
		const data = { ...fakeProperty(client.id), id: uuid() };
		const propertyForm = new PropertyForm(page, data, client);
		await trpcClient.mutation('clients:create', client);
		await trpcClient.mutation('properties:create', data);
		await use(propertyForm);
		await trpcClient.mutation('properties:delete', propertyForm.data.id);
		await trpcClient.mutation('clients:delete', client.id);
	},
});

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
