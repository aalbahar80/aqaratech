import type { AppRouter } from '$lib/server/trpc/router';
import * as TRPC from '@trpc/client';
import cookie from 'cookie';
import fetch from 'cross-fetch';
import superjson from 'superjson';
import auth from './adminStorageState.json';

const baseUrl = 'http://localhost:3000';
const tokens = auth.cookies.filter(
	(c) => c.name === 'accessToken' || c.name === 'idToken',
);
const cookieStrings = tokens.map((c) => cookie.serialize(c.name, c.value));
const cookieString = cookieStrings.join('; ');
export const trpc = TRPC.createTRPCClient<AppRouter>({
	fetch,
	url: baseUrl + '/trpc',
	transformer: superjson,
	headers: {
		cookie: cookieString,
	},
});
