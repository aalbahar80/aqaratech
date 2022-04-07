import {
	createContext,
	responseMeta,
	createTRPCHandle,
	router,
} from '$lib/server/trpc';
import { appAuth } from '$lib/services/auth';
import type { GetSession, Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

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
	event.locals.error = false;
	let response = await resolve(event);

	if (response.status > 399 && response.status < 600) {
		event.locals.error = true;
		response = await resolve(event);
	}

	return response;
};

export const handle: Handle = sequence(authHandler, trpcHandler, noIndex);

export const getSession: GetSession = async (event) => {
	const { user } = await appAuth.getSession(event);

	return {
		user,
		error: event.locals.error,
	};
};
