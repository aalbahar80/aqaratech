import {
	createContext,
	responseMeta,
	createTRPCHandle,
	router,
} from '$lib/server/trpc';
import { parseUser } from '$lib/services/auth/config';
import type { GetSession, Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import cookie from 'cookie';

const noIndex: Handle = async ({ event, resolve }) => {
	// TODO remove this in production
	const response = await resolve(event);
	// eslint-disable-next-line no-constant-condition
	if (import.meta.env.VITE_VERCEL_ENV !== 'production' || true) {
		response.headers.set('X-Robots-Tag', 'noindex');
	}
	// response.headers.set('cache-control', 's-maxage=0');
	return response;
};

const trpcHandler: Handle = createTRPCHandle({
	router,
	createContext,
	responseMeta,
});

const authHandler: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.idToken = cookies.idToken || '';
	event.locals.accessToken = cookies.accessToken || '';
	event.locals.user = parseUser(cookies.idToken);

	const response = await resolve(event);
	response.headers.append(
		'Set-Cookie',
		cookie.serialize('idToken', event.locals.idToken, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		cookie.serialize('accessToken', event.locals.accessToken, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);
	return response;
};

export const handle: Handle = sequence(authHandler, trpcHandler, noIndex);

export const getSession: GetSession = async ({ locals }) => ({
	user: locals.user,
});
