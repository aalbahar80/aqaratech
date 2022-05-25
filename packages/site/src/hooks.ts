import { dev } from '$app/env';
import { environment } from '$environment';
import { appRouter, createContext, responseMeta } from '$lib/server/trpc';
import { getAuthz } from '$lib/server/utils';
import { getUser } from '$lib/server/utils/getAuthz';
import * as Sentry from '@sentry/node';
import '@sentry/tracing'; // has to be after @sentry/node
import type { GetSession, Handle, HandleError } from '@sveltejs/kit';
import { resolveHTTPResponse, type Dict } from '@trpc/server';
import { parse, serialize } from 'cookie';

if (
	process.env.VERCEL_ENV === 'production' ||
	process.env.VERCEL_ENV === 'preview'
) {
	Sentry.init({
		dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
		tracesSampleRate: 0.25,
		release: import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA ?? 'localServerRelease',
		environment: process.env.VERCEL
			? process.env.VERCEL_GIT_COMMIT_REF
			: 'localServer',
		debug: dev,
	});
}

export const getSession: GetSession = async ({ locals }) => ({
	user: locals.user,
	authz: locals.authz,
});

export const handle: Handle = async ({ event, resolve }) => {
	// TODO cast cookie type to avoid typos. OpenApi Auth0 type?
	const cookies = parse(event.request.headers.get('cookie') || '');

	event.locals.idToken = cookies.idToken || '';
	event.locals.accessToken = cookies.accessToken || '';

	const authz = await getAuthz(cookies.idToken, 'idToken');
	const user = await getUser(cookies.idToken);
	event.locals.authz = authz;
	event.locals.user = user;

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
			onError: async (error) => {
				console.error(error);
			},
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
		serialize('idToken', event.locals.idToken, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		serialize('accessToken', event.locals.accessToken, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	if (environment.envName !== 'prod') {
		response.headers.set('X-Robots-Tag', 'noindex'); // TODO remove in prod
	}
	return response;
};

export const handleError: HandleError = async ({ error, event }) => {
	console.error(error, 'hooks.ts ~ 104');
	const user = event.locals.user;
	Sentry.captureException(error, {
		user: {
			id: user?.sub || '',
			email: user?.email || '',
			username: user?.name || '',
		},
	});
};
