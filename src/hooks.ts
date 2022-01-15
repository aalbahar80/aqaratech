import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle<Locals> = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');

	request.locals.user = cookies.user;
	request.locals.hasura = cookies.hasura;

	const response = await resolve(request);

	// TODO: samesite=strict? - in prod only?
	response.headers['set-cookie'] = [
		cookie.serialize('user', request.locals.user || '', {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			// sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
		}),
		cookie.serialize('hasura', request.locals.hasura || '', {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			// sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
		}),
	];

	return response;
};

export const getSession: GetSession<Locals, unknown, Session> = (request) => ({
	user: request.locals.user,
	hasura: request.locals.hasura,
});
