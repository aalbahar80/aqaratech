import { fakeClient } from '../../../seed/generators.js';
import { dateToInput } from '../../src/lib/utils/common.js';
import { expect, test } from '../config/trpc-test.js';

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

const editTest = test.extend<{ id: string }>({
	id: async ({ trpcClient }, use) => {
		// create a client
		const { id } = await trpcClient.mutation('clients:create', fakeClient());
		await use(id);
		// Cleanup
		await trpcClient.mutation('clients:delete', id);
	},
});

editTest.describe('Edit client form', async () => {
	editTest.beforeEach(async ({ page, id }) => {
		await page.goto(`/clients/${id}/edit`, {
			waitUntil: 'networkidle',
		});
		// try context.on('sveltekit:start', ...)
	});

	editTest('returns a 200 response', async ({ page }) => {
		const client = fakeClient();
		await page.fill('input[name="firstName"]', client.firstName);
		await page.fill('input[name="lastName"]', client.lastName);
		await page.fill('input[name="email"]', client.email);
		await page.fill('input[name="phone"]', client.phone);
		await page.fill('input[name="civilid"]', client.civilid);
		await page.fill('input[name="dob"]', dateToInput(client.dob));

		const re = new RegExp('/trpc');
		const [request] = await Promise.all([
			page.waitForRequest(re),
			await page.click('button[type="submit"]'),
		]);

		const response = await request.response();
		expect(response?.status()).toBe(200);
	});

	editTest('redirects to client detail page', async ({ page, id }) => {
		await page.click('button[type="submit"]');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveURL(`/clients/${id}`);
	});
});
