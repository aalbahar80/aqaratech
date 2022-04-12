import { createContext, responseMeta, router } from '$lib/server/trpc';
import { parseUser } from '$lib/services/auth/config';
import type { GetSession, Handle } from '@sveltejs/kit';
import { resolveHTTPResponse, type Dict } from '@trpc/server';
import cookie from 'cookie';

export const getSession: GetSession = async ({ locals }) => ({
	user: locals.user,
	idToken: locals.idToken,
	accessToken: locals.accessToken,
});

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	console.log({ cookies }, 'hooks.ts ~ 31');
	event.locals.idToken = cookies.idToken || '';
	event.locals.accessToken = cookies.accessToken || '';
	event.locals.user = parseUser(cookies.idToken);
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
			router,
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
