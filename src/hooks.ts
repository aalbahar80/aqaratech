/* eslint-disable import/prefer-default-export */
import type { Handle, GetSession } from '@sveltejs/kit';

import * as cookie from 'cookie';

export const handle: Handle = async ({ request, resolve }) => {
	console.log(request);
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.user = cookies.user;

	const response = await resolve(request);

	response.headers['set-cookie'] = `user=${
		request.locals.user || ''
	}; path=/; HttpOnly`;

	return response;
};

export const getSession: GetSession = async (request) => {
	return {
		user: request.locals.user,
	};
};
