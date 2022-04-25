import { expect, test } from '@playwright/test';
import { fakeClient } from '../../../seed/generators.js';
import { dateToInput } from '../../src/lib/utils/common.js';
import { installFetch } from '@sveltejs/kit/install-fetch';
import type { AppRouter } from '$lib/server/trpc/router';
import type { TrpcClient } from '$lib/client/trpc';
import * as trpc from '@trpc/client';
import superjson from 'superjson';
import cookie from 'cookie';

installFetch();

test.use({ storageState: './tests/config/adminStorageState.json' });
test.describe(`New client form`, async () => {
	test.beforeEach(async ({ page }) => {
		const client = fakeClient();
		await page.goto('http://localhost:3000/new/clients', {
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

		await expect(page).toHaveURL(
			/^http:\/\/localhost:3000\/clients\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}){1}\/?$/,
		);
	});
});

test.describe('Edit client form', async () => {
	let id: string;
	let trpcClient: TrpcClient;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		const allCookies = await context.cookies();
		const cookies = allCookies.filter(
			(c) => c.name === 'accessToken' || c.name === 'idToken',
		);
		const cookieStrings = cookies.map((c) => cookie.serialize(c.name, c.value));
		const cookieString = cookieStrings.join('; ');

		// TRPC
		trpcClient = trpc.createTRPCClient<AppRouter>({
			url: 'http://localhost:3000/trpc',
			transformer: superjson,
			headers: {
				cookie: cookieString,
			},
		});
	});

	test.beforeEach(async ({ page }) => {
		// To be used for subsequent tests
		({ id } = await trpcClient.mutation('clients:create', fakeClient()));
		await page.goto(`http://localhost:3000/clients/${id}/edit`, {
			waitUntil: 'networkidle',
		});
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
		expect(response?.status()).toBe(200);
	});

	test('redirects to client detail page', async ({ page }) => {
		await page.click('button[type="submit"]');
		await page.waitForLoadState('networkidle');
		await expect(page).toHaveURL(`http://localhost:3000/clients/${id}`);
	});
});
