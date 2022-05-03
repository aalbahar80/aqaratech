import type { AppRouter } from '$lib/server/trpc/router';
import { createTRPCClient } from '@trpc/client';
import { serialize } from 'cookie';
import fetch from 'cross-fetch';
import superjson from 'superjson';
import auth from './adminState.json';

// TODO: https://playwright.dev/docs/cli#preserve-authenticated-state
const baseUrl = 'http://localhost:3000';
const tokens = auth.cookies.filter(
	(c) => c.name === 'accessToken' || c.name === 'idToken',
);
const cookieStrings = tokens.map((c) => serialize(c.name, c.value));
const cookieString = cookieStrings.join('; ');
export const trpc = createTRPCClient<AppRouter>({
	fetch,
	url: baseUrl + '/trpc',
	transformer: superjson,
	headers: {
		cookie: cookieString,
	},
});
