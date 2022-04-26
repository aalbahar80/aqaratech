import type { Page } from '@playwright/test';
import { fakeClient } from '../../../seed/generators.js';
import { dateToInput } from '../../src/lib/utils/common.js';
import { expect, test as base } from '../config/trpc-test.js';

class Form {
	constructor(public page: Page) {}
	submit() {
		return this.page.click('button[type="submit"]');
	}
}

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
}

base.use({ storageState: './tests/config/adminStorageState.json' });

const test = base.extend<{ clientForm: ClientForm }>({
	clientForm: async ({ page, trpcClient }, use) => {
		const clientForm = new ClientForm(page);
		await trpcClient.mutation('clients:create', clientForm.data);
		await use(clientForm);
		await trpcClient.mutation('clients:delete', clientForm.data.id);
	},
});

test.describe(`New client form`, async () => {
	test.beforeEach(async ({ page, clientForm }) => {
		await page.goto('/new/clients', {
			waitUntil: 'networkidle',
		});
		await clientForm.fill();
	});

	test('returns a status of 200', async ({ page, clientForm }) => {
		const [request] = await Promise.all([
			page.waitForRequest(/^http:\/\/localhost:3000\/trpc/),
			await clientForm.submit(),
		]);

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
});

test.describe('Edit client form', async () => {
	test.beforeEach(async ({ page, clientForm }) => {
		await page.goto(`/clients/${clientForm.data.id}/edit`, {
			waitUntil: 'networkidle',
		});
		// try context.on('sveltekit:start', ...)
	});

	test('returns a 200 response', async ({ page, clientForm }) => {
		await clientForm.fill();

		const re = new RegExp('/trpc');
		const [request] = await Promise.all([
			page.waitForRequest(re),
			await clientForm.submit(),
		]);

		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	test('redirects to client detail page', async ({ page, clientForm }) => {
		await clientForm.submit();
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveURL(`/clients/${clientForm.data.id}`);
	});
});
