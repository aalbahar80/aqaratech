import type { TrpcClient } from '$lib/client/trpc';
import type { AppRouter } from '$lib/server/trpc/router';
import { test as base } from '@playwright/test';
import { installFetch } from '@sveltejs/kit/install-fetch';
import * as trpc from '@trpc/client';
import cookie from 'cookie';
import superjson from 'superjson';

installFetch();

export const test = base.extend<{ trpcClient: TrpcClient }>({
	trpcClient: async ({ context, baseURL }, use) => {
		const allCookies = await context.cookies();
		const cookies = allCookies.filter(
			(c) => c.name === 'accessToken' || c.name === 'idToken',
		);

		const cookieStrings = cookies.map((c) => cookie.serialize(c.name, c.value));
		const cookieString = cookieStrings.join('; ');

		const trpcClient = trpc.createTRPCClient<AppRouter>({
			url: baseURL + '/trpc',
			transformer: superjson,
			headers: {
				cookie: cookieString,
			},
		});
		await use(trpcClient);
	},
});

export { expect } from '@playwright/test';
