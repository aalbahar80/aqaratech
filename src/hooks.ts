/* eslint-disable import/prefer-default-export */
import type { Handle, GetSession } from '@sveltejs/kit';
import cookie from 'cookie';
import { session } from '$app/stores';


export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || null);
	console.log({ cookies });
	request.locals.user = cookies.user;

	const response = await resolve(request);

	response.headers['set-cookie'] = `user=${
		request.locals.user || ''
	}; Path=/; HttpOnly`;

	return response;
};

export const getSession: GetSession = async (request) => {
	console.log('getting session', request.locals.user);
	return {
		user: request.locals.user,
	};
};
