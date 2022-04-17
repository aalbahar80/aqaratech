import { appRouter, createContext, responseMeta } from '$lib/server/trpc';
import { getAuthz } from '$lib/server/utils';
import type { GetSession, Handle } from '@sveltejs/kit';
import { resolveHTTPResponse, type Dict } from '@trpc/server';
import cookie from 'cookie';

export const getSession: GetSession = async ({ locals }) => ({
	user: locals.user,
	authz: locals.authz,
});

export const handle: Handle = async ({ event, resolve }) => {
	// TODO cast cookie type to avoid typos. OpenApi Auth0 type?
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	event.locals.idToken = cookies.idToken || '';
	event.locals.accessToken = cookies.accessToken || '';

	const authz = await getAuthz(cookies.idToken || '', 'idToken');
	event.locals.authz = authz;

	let response;

	const url = '/trpc';
	if (event.url.pathname.startsWith(`${url}/`)) {
		const request = event.request as Request & {
			headers: Dict<string | string[]>;
		};

		const req = {
			method: request.method,
			headers: request.headers,
			query: event.url.searchParams,
			body: await request.text(),
		};

		const httpResponse = await resolveHTTPResponse({
			router: appRouter,
			req,
			path: event.url.pathname.substring(url.length + 1),
			createContext: async () => createContext?.(event),
			responseMeta,
		});

		const { status, headers, body } = httpResponse as {
			status: number;
			headers: Record<string, string>;
			body: string;
		};

		response = new Response(body, { status, headers });
	} else {
		response = await resolve(event);
	}

	response.headers.append(
		'Set-Cookie',
		cookie.serialize('idToken', event.locals.idToken, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		cookie.serialize('accessToken', event.locals.accessToken, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.set('X-Robots-Tag', 'noindex'); // TODO remove in prod
	return response;
};
