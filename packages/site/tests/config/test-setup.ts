import type { TrpcClient } from '$lib/client/trpc';
import type { AppRouter } from '$lib/server/trpc/router';
import { test as base } from '@playwright/test';
import * as trpc from '@trpc/client';
import cookie from 'cookie';
import superjson from 'superjson';
import { v4 as uuid } from 'uuid';
import { fakeClient, fakeProperty } from '../../../seed/generators.js';
import { PropertyForm, ClientForm } from '../forms/form.js';
// import { fetch } from 'fetch-h2';
// import fetch from 'node-fetch';
import fetch from 'cross-fetch';

export const test = base.extend<{
	trpcClient: TrpcClient;
	clientForm: ClientForm;
	propertyForm: PropertyForm;
	forms: Array<ClientForm | PropertyForm>;
}>({
	trpcClient: async ({ context, baseURL }, use) => {
		const allCookies = await context.cookies();
		const cookies = allCookies.filter(
			(c) => c.name === 'accessToken' || c.name === 'idToken',
		);

		const cookieStrings = cookies.map((c) => cookie.serialize(c.name, c.value));
		const cookieString = cookieStrings.join('; ');

		const trpcClient = trpc.createTRPCClient<AppRouter>({
			fetch,
			url: baseURL + '/trpc',
			transformer: superjson,
			headers: {
				cookie: cookieString,
			},
		});
		await use(trpcClient);
	},
	page: async ({ page }, use) => {
		// Ensures that sveltekit is done hydrating the page
		// Ensures non-flaky tests
		await page.addInitScript({
			content: `
			window.started = new Promise((fulfil, reject) => {
				setTimeout(() => {
					reject(new Error('Did not receive sveltekit:start event'));
				}, 5000);
				addEventListener('sveltekit:start', () => {
					fulfil();
				});
			});
		`,
		});
		await use(page);
	},
	clientForm: async ({ page, trpcClient }, use) => {
		// override faker's id beacuse this sometimes returns the same data twice
		const data = { ...fakeClient(), id: uuid() };
		const clientForm = new ClientForm(page, data);
		await trpcClient.mutation('clients:create', clientForm.data);
		await use(clientForm);
		await trpcClient.mutation('clients:delete', clientForm.data.id);
	},
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
	forms: async ({ clientForm, propertyForm }, use) => {
		await use([clientForm, propertyForm]);
	},
});

export { expect } from '@playwright/test';
