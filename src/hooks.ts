import { f } from '$lib/config/colorLog';
import { logger } from '$lib/config/logger';
import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle<Locals> = async ({ event, resolve }) => {
	logger.debug(f('hooks.ts', 8, event.request.headers));
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	logger.debug(f('hooks.ts', 11, { cookies }));

	logger.debug({ event }, 'hooks.ts ~ 12');
	event.locals.user = cookies.user || '';
	event.locals.hasura = cookies.hasura || '';

	const response = await resolve(event);

	logger.debug(response.headers, 'hooks.ts ~ 16');
	// TODO: samesite=strict? - in prod only?
	response.headers.append(
		'Set-Cookie',
		cookie.serialize('user', event.locals.user, {
			// httpOnly: false,
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			// sameSite: 'lax',
			// sameSite: 'strict',
			sameSite: 'none',
			secure: true,
			// secure: false,
			// secure: false,
			// secure: process.env.NODE_ENV === 'production',
		}),
	);

	response.headers.append(
		'Set-Cookie',
		cookie.serialize('hasura', event.locals.hasura, {
			// httpOnly: false,
			httpOnly: true,
			path: '/',
			sameSite: 'none',
			// sameSite: 'none',
			secure: true,
			maxAge: 60 * 60 * 24 * 7,
			// sameSite: 'none',
			// secure: false,
			// sameSite: 'lax',
			// sameSite: 'none',
			// secure: false,
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
