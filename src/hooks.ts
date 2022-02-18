import { logger } from '$lib/config/logger';
import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';
// import { createContext, responseMeta, router } from '$lib/server/trpc/index';
import { createContext, router } from '$lib/server/trpc/index';
import { createTRPCHandle } from 'trpc-sveltekit';

export const handle = createTRPCHandle({ router, createContext });

// export const handle: Handle = async ({ event, resolve }) => {
// 	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

// 	event.locals.user = cookies.user || '';
// 	event.locals.hasura = cookies.hasura || '';
// 	event.locals.userId = cookies.userId || '';

// 	// decode the user jwt to get the userId
// 	if (event.locals.user) {
// 		const encodedJwt = event.locals.user.split('.')[1];
// 		const decodedJwt = JSON.parse(
// 			Buffer.from(encodedJwt, 'base64').toString('ascii'),
// 		);
// 		event.locals.userId = decodedJwt.sub;
// 	} else {
// 		event.locals.userId = '';
// 	}

// 	const response = await resolve(event);

// 	// if (!event.locals.user && !publicPages.includes(event.url.pathname)) {
// 	// 	// return {
// 	// 	// 	status: 302,
// 	// 	// 	headers: {
// 	// 	// 		location: '/',
// 	// 	// 	},
// 	// 	// };
// 	// 	return new Response('someStringBody', {
// 	// 		status: 302,
// 	// 		headers: { location: '/' },
// 	// 	});
// 	// }

// 	response.headers.append(
// 		'Set-Cookie',
// 		cookie.serialize('user', event.locals.user, {
// 			httpOnly: true,
// 			path: '/',
// 			maxAge: 60 * 60 * 24 * 7,
// 			sameSite: 'none', // TODO research
// 			secure: true,
// 		}),
// 	);

// 	response.headers.append(
// 		'Set-Cookie',
// 		cookie.serialize('hasura', event.locals.hasura, {
// 			httpOnly: true,
// 			path: '/',
// 			maxAge: 60 * 60 * 24 * 7,
// 			sameSite: 'none', // TODO research
// 			secure: true,
// 		}),
// 	);

// 	response.headers.append(
// 		'Set-Cookie',
// 		cookie.serialize('userId', event.locals.userId, {
// 			httpOnly: true,
// 			path: '/',
// 			maxAge: 60 * 60 * 24 * 7,
// 			sameSite: 'none', // TODO research
// 			secure: true,
// 		}),
// 	);

// 	// TODO remove this in production
// 	// eslint-disable-next-line no-constant-condition
// 	if (import.meta.env.VITE_VERCEL_ENV !== 'production' || true) {
// 		response.headers.set('X-Robots-Tag', 'noindex');
// 	}
// 	// response.headers.set('cache-control', 's-maxage=0');

// 	return response;
// };

export const getSession: GetSession = ({ locals }) => ({
	user: locals.user,
	hasura: locals.hasura,
	userId: locals.userId,
});
