import type { Page } from '@playwright/test';
import { v4 as uuid } from 'uuid';
import { fakeClient } from '../../../seed/generators.js';
import { dateToInput } from '../../src/lib/utils/common.js';
import { expect, test as base } from '../config/test-setup.js';
import { Form } from './form.js';

class ClientForm extends Form {
	constructor(page: Page, public data = fakeClient()) {
		super(page);
	}

	public async fill() {
		await this.page.fill('input[name="firstName"]', this.data.firstName);
		await this.page.fill('input[name="lastName"]', this.data.lastName);
		await this.page.fill('input[name="email"]', this.data.email);
		await this.page.fill('input[name="phone"]', this.data.phone);
		await this.page.fill('input[name="civilid"]', this.data.civilid);
		await this.page.fill('input[name="dob"]', dateToInput(this.data.dob));
	}

	public alter() {
		this.data = {
			...fakeClient(),
			id: this.data.id,
		};
	}
}

base.use({ storageState: './tests/config/adminStorageState.json' });

const test = base.extend<{ clientForm: ClientForm }>({
	clientForm: async ({ page, trpcClient }, use) => {
		// override faker's id beacuse this sometimes returns the same data twice
		const data = { ...fakeClient(), id: uuid() };
		const clientForm = new ClientForm(page, data);
		await trpcClient.mutation('clients:create', clientForm.data);
		await use(clientForm);
		await trpcClient.mutation('clients:delete', clientForm.data.id);
	},
});

test.describe(`New client form`, async () => {
	test.beforeEach(async ({ page, clientForm }) => {
		await page.goto('/new/clients');
		// @ts-ignore
		await page.evaluate(() => window.started); // waits for hydration
		await clientForm.fill();
	});

	test('returns a status of 200', async ({ clientForm }) => {
		const request = await clientForm.getRequest();
		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	test('redirects to client detail page', async ({ page, clientForm }) => {
		await clientForm.submit();

		const re = new RegExp(
			`/clients/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
		);
		await expect(page).toHaveURL(re);
	});

	test('some details are correct', async ({ clientForm, page }) => {
		await clientForm.submit();
		await page.waitForNavigation();

		const el = page.locator(`text=${clientForm.data.firstName}`);
		const re = new RegExp(
			`${clientForm.data.firstName} ${clientForm.data.lastName}`,
		);
		expect(await el.textContent()).toMatch(re);

		const el2 = page.locator(`"${clientForm.data.email}"`);
		expect(await el2.innerText()).toBe(clientForm.data.email);
	});
});

test.describe('Edit client form', async () => {
	test.beforeEach(async ({ page, clientForm }) => {
		await page.goto(`/clients/${clientForm.data.id}/edit`);
		// @ts-ignore
		await page.evaluate(() => window.started); // waits for hydration
	});

	test('returns a 200 response', async ({ clientForm }) => {
		clientForm.alter();
		await clientForm.fill();
		const request = await clientForm.getRequest();
		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	test('redirects to client detail page', async ({ page, clientForm }) => {
		await clientForm.submit();
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveURL(`/clients/${clientForm.data.id}`);
	});

	test('some details are correct', async ({ clientForm, page }) => {
		await clientForm.submit();
		await page.waitForNavigation();

		const el = page.locator(`text=${clientForm.data.firstName}`);
		const re = new RegExp(
			`${clientForm.data.firstName} ${clientForm.data.lastName}`,
		);
		expect(await el.textContent()).toMatch(re);

		const el2 = page.locator(`"${clientForm.data.email}"`);
		expect(await el2.innerText()).toBe(clientForm.data.email);
	});
});
