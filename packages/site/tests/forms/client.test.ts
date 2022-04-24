import { expect, test } from '@playwright/test';
import { fakeClient } from '../../../seed/generators.js';
import { dateToInput } from '../../src/lib/utils/common.js';

test.use({ storageState: './tests/config/adminStorageState.json' });

const formTypes = [
	{
		name: 'new',
		path: '/clients/new',
	},
	{
		name: 'edit',
		path: '/clients/:id/edit',
	},
];

formTypes.forEach((formType) => {
	test.describe(`${formType.name} client form`, async () => {
		let clientId: string;

		test.beforeEach(async ({ page }) => {
			const client = fakeClient();
			await page.goto('http://localhost:3000');

			await page.click('a:has-text("Clients")');
			await page.click('a:has-text("New")');

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
			expect(response.status()).toBe(200);

			clientId = page.url().split('/').pop();
		});

		test('redirects to new client page', async ({ page }) => {
			await page.click('button[type="submit"]');

			await expect(page).toHaveURL(
				/^http:\/\/localhost:3000\/clients\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}){1}\/?$/,
			);

			clientId = page.url().split('/').pop();
		});

		test('Client can be edited', async ({ page }) => {
			const client = fakeClient();

			await page.goto('http://localhost:3000/clients/' + clientId);

			await page.click('a:has-text("Edit")');

			await page.fill('input[name="firstName"]', client.firstName);
			await page.fill('input[name="lastName"]', client.lastName);
			await page.fill('input[name="email"]', client.email);
			await page.fill('input[name="phone"]', client.phone);
			await page.fill('input[name="civilid"]', client.civilid);
			await page.fill('input[name="dob"]', dateToInput(client.dob));

			await page.click('button[type="submit"]');

			await expect(page).toHaveURL(
				/^http:\/\/localhost:3000\/clients\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}){1}\/?$/,
			);
		});
	});
});
