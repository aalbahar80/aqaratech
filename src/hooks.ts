// import { createContext, responseMeta, router } from '$lib/server/trpc/index';
import { createContext, router } from '$lib/server/trpc/index';
import type { GetSession, Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import cookie from 'cookie';
import { createTRPCHandle } from 'trpc-sveltekit';

// remove trailing slash for /trpc requests
const removeTrailingSlash: Handle = async ({ event, resolve }) => {
	if (
		event.url.pathname.endsWith('/') &&
		event.url.pathname.startsWith('/trpc')
	) {
		event.url.pathname = event.url.pathname.slice(0, -1);
	}
	const response = await resolve(event);
	return response;
};

export const trpcHandler: Handle = createTRPCHandle({ router, createContext });
export const handle2: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	event.locals.user = cookies.user || '';
	event.locals.hasura = cookies.hasura || '';
	event.locals.userId = cookies.userId || '';

	// decode the user jwt to get the userId
	if (event.locals.user) {
		const encodedJwt = event.locals.user.split('.')[1];
		const decodedJwt = JSON.parse(
			Buffer.from(encodedJwt, 'base64').toString('ascii'),
		);
		event.locals.userId = decodedJwt.sub;
	} else {
		event.locals.userId = '';
	}

	const response = await resolve(event);

	// if (!event.locals.user && !publicPages.includes(event.url.pathname)) {
	// 	// return {
	// 	// 	status: 302,
	// 	// 	headers: {
	// 	// 		location: '/',
	// 	// 	},
	// 	// };
	// 	return new Response('someStringBody', {
	// 		status: 302,
	// 		headers: { location: '/' },
	// 	});
	// }

	response.headers.append(
		'Set-Cookie',
		cookie.serialize('user', event.locals.user, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		cookie.serialize('hasura', event.locals.hasura, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		cookie.serialize('userId', event.locals.userId, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	// TODO remove this in production
	// eslint-disable-next-line no-constant-condition
	if (import.meta.env.VITE_VERCEL_ENV !== 'production' || true) {
		response.headers.set('X-Robots-Tag', 'noindex');
	}
	// response.headers.set('cache-control', 's-maxage=0');

	return response;
};
export const handle: Handle = sequence(
	removeTrailingSlash,
	trpcHandler,
	// handle2,
);

export const getSession: GetSession = ({ locals }) => ({
	user: locals.user,
	hasura: locals.hasura,
	userId: locals.userId,
});
