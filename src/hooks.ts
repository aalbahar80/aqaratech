import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');

	request.locals.user = cookies.user;
	request.locals.hasura = cookies.hasura;

	const response = await resolve(request);

	// TODO: samesite=strict? - in prod only?
	response.headers['set-cookie'] = [
		cookie.serialize('user', (request.locals.user as string) || '', {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		}),
		cookie.serialize('hasura', (request.locals.hasura as string) || '', {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		}),
	];

	return response;
};

export const getSession: GetSession = (request) => ({
	user: request.locals.user as string,
	hasura: request.locals.hasura as string,
});
