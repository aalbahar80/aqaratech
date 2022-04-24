import { expect, test } from '@playwright/test';
import { fakeClient } from '../../../seed/generators.js';
import { dateToInput } from '../../src/lib/utils/common.js';
import { installFetch } from '@sveltejs/kit/install-fetch';
import type { AppRouter } from '../../src/lib/server/trpc';
import * as trpc from '@trpc/client';
import superjson from 'superjson';
import cookie from 'cookie';

installFetch();

test.use({ storageState: './tests/config/adminStorageState.json' });
test.describe(`New client form`, async () => {
	test.beforeEach(async ({ page }) => {
		const client = fakeClient();
		await page.goto('http://localhost:3000/new/clients');
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
	});

	test('redirects to client detail page', async ({ page }) => {
		await page.click('button[type="submit"]');

		await expect(page).toHaveURL(
			/^http:\/\/localhost:3000\/clients\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}){1}\/?$/,
		);
	});
});

test.describe.only('Edit client form', async () => {
	let id: string;
	// test.beforeAll(async ({ context }) => {
	// });
	test.beforeEach(async ({ page, context }) => {
		const cookiesArray = await context.cookies();
		const cookies = cookiesArray.find((c) => c.name === 'accessToken');
		const accessToken = cookie.serialize('accessToken', cookies.value);
		const idToken = cookiesArray.find((c) => c.name === 'idToken');
		const idTokenCookie = cookie.serialize('idToken', idToken.value);
		const trpcClient = trpc.createTRPCClient({
			url: 'http://localhost:3000/trpc',
			transformer: superjson,
			headers: {
				cookie: accessToken + '; ' + idTokenCookie,
			},
		});
		({ id } = await trpcClient.mutation('clients:create', fakeClient()));
		await page.goto(`http://localhost:3000/clients/${id}/edit`);
	});

	test('returns a 200 response', async ({ page }) => {
		const client = fakeClient();
		await page.fill('input[name="firstName"]', client.firstName);
		await page.fill('input[name="lastName"]', client.lastName);
		await page.fill('input[name="email"]', client.email);
		await page.fill('input[name="phone"]', client.phone);
		await page.fill('input[name="civilid"]', client.civilid);
		await page.fill('input[name="dob"]', dateToInput(client.dob));

		const [request] = await Promise.all([
			page.waitForRequest(/^http:\/\/localhost:3000\/trpc/),
			await page.click('button[type="submit"]'),
		]);

		const response = await request.response();
		expect(response.status()).toBe(200);
	});

	test('redirects to client detail page', async ({ page }) => {
		await page.click('button[type="submit"]');
		await page.waitForLoadState('networkidle');

		await expect(page).toHaveURL(`http://localhost:3000/clients/${id}`);
	});
});
