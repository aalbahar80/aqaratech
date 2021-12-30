/* eslint-disable import/prefer-default-export */
import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	console.log({ cookies });
	request.locals.user = cookies.user;

	const response = await resolve(request);

	response.headers['set-cookie'] = `user=${
		(request.locals.user as string) || ''
	}; Path=/; HttpOnly`;

	return response;
};

export const getSession: GetSession = (request) => {
	console.log('getting session', request.locals.user);
	return {
		user: request.locals.user as string,
	};
};
