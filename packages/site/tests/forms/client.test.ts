import type { Page } from '@playwright/test';
import { fakeClient } from '../../../seed/generators.js';
import { dateToInput } from '../../src/lib/utils/common.js';
import { expect, test } from '../config/trpc-test.js';

class Form {
	constructor(public page: Page) {}
	submit() {
		return this.page.click('button[type="submit"]');
	}
}
class ClientForm extends Form {
	data = fakeClient();

	public async fill() {
		await this.page.fill('input[name="firstName"]', this.data.firstName);
		await this.page.fill('input[name="lastName"]', this.data.lastName);
		await this.page.fill('input[name="email"]', this.data.email);
		await this.page.fill('input[name="phone"]', this.data.phone);
		await this.page.fill('input[name="civilid"]', this.data.civilid);
		await this.page.fill('input[name="dob"]', dateToInput(this.data.dob));
	}
}

test.use({ storageState: './tests/config/adminStorageState.json' });
test.describe(`New client form`, async () => {
	test.beforeEach(async ({ page }) => {
		const client = fakeClient();
		await page.goto('/new/clients', {
			waitUntil: 'networkidle',
		});
		await page.fill('input[name="firstName"]', client.firstName);
		await page.fill('input[name="lastName"]', client.lastName);
		await page.fill('input[name="email"]', client.email);
		await page.fill('input[name="phone"]', client.phone);
		await page.fill('input[name="civilid"]', client.civilid);
		await page.fill('input[name="dob"]', dateToInput(client.dob));
	});

	test('returns a status of 200', async ({ page }) => {
		const [request] = await Promise.all([
			page.waitForRequest(/^http:\/\/localhost:3000\/trpc/),
			await page.click('button[type="submit"]'),
		]);

		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	test('redirects to client detail page', async ({ page }) => {
		await page.click('button[type="submit"]');

		const re = new RegExp(
			`/clients/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`,
		);
		await expect(page).toHaveURL(re);
	});
});

const editTest = test.extend<{ id: string; clientForm: ClientForm }>({
	id: async ({ trpcClient }, use) => {
		// create a client
		const { id } = await trpcClient.mutation('clients:create', fakeClient());
		await use(id);
		// Cleanup
		await trpcClient.mutation('clients:delete', id);
	},
	clientForm: async ({ page }, use) => {
		const clientForm = new ClientForm(page);
		await use(clientForm);
	},
});

editTest.describe('Edit client form', async () => {
	editTest.beforeEach(async ({ page, id }) => {
		await page.goto(`/clients/${id}/edit`, {
			waitUntil: 'networkidle',
		});
		// try context.on('sveltekit:start', ...)
	});

	editTest('returns a 200 response', async ({ page, clientForm }) => {
		await clientForm.fill();

		const re = new RegExp('/trpc');
		const [request] = await Promise.all([
			page.waitForRequest(re),
			await clientForm.submit(),
		]);

		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	editTest(
		'redirects to client detail page',
		async ({ page, id, clientForm }) => {
			await clientForm.submit();
			await page.waitForLoadState('networkidle');
			await expect(page).toHaveURL(`/clients/${id}`);
		},
	);
});
