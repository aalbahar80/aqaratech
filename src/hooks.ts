import { f } from '$lib/config/colorLog';
import { logger } from '$lib/config/logger';
import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle<Locals> = async ({ event, resolve }) => {
	logger.debug(f('hooks.ts', 8, event.request.headers));
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	logger.debug(f('hooks.ts', 11, { cookies }));

	event.locals.user = cookies.user || '';
	event.locals.hasura = cookies.hasura || '';

	const response = await resolve(event);

	// TODO: samesite=strict? - in prod only?
	response.headers.append(
		'Set-Cookie',
		cookie.serialize('user', event.locals.user, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			// sameSite: 'strict',
			// secure: process.env.NODE_ENV === 'production',
		}),
	);

	response.headers.append(
		'Set-Cookie',
		cookie.serialize('hasura', event.locals.hasura, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			// sameSite: 'strict',
			// secure: process.env.NODE_ENV === 'production',
		}),
	);

	return response;
};

export const getSession: GetSession<Locals> = ({ locals }) => ({
	user: locals.user,
	hasura: locals.hasura,
});
