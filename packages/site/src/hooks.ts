import { dev } from '$app/env';
import { environment } from '$environment';
import { getUser } from '$lib/server/utils/getAuthz';
import type { ResponseError } from '@self/sdk';
import * as Sentry from '@sentry/node';
import type {
	ExternalFetch,
	GetSession,
	Handle,
	HandleError,
} from '@sveltejs/kit';
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
	accessToken: locals.accessToken,
});

export const handle: Handle = async ({ event, resolve }) => {
	const now = Date.now();
	const method = event.request.method;
	console.log(
		`Request: ${method} ${event.url.href} ${event.clientAddress}: ${event.routeId} ${event.request.headers.get('user-agent')}`);

	// TODO cast cookie type to avoid typos. OpenApi Auth0 type?
	const cookies = parse(event.request.headers.get('cookie') || '');

	event.locals.idToken = cookies.idToken || '';
	event.locals.accessToken = cookies.accessToken || '';

	const user = await getUser(cookies.idToken);
	event.locals.user = user;

	const response = await resolve(event);
	console.log(
		`Response: ${Date.now() - now
		}ms - ${method} ${event.url.pathname} ${response.status} - ${event.request.headers.get('user-agent')} ${event.clientAddress} - ${event.locals.user?.email}`,
	);

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
	console.error(error);
	const { locals, params } = event;
	const details = {
		name: 'handleError',
		url: event.url.href,
		locals,
		params,
	};
	console.error(details);

	const thrown = error as Error | ResponseError;
	const res = 'response' in thrown ? thrown.response : undefined;
	if (res) {
		const body = await res.json();
		const resDetails = {
			name: 'Response Error (from handleError)',
			status: res.status,
			url: res.url,
			body,
		};
		console.error(resDetails);
	}

	const user = event.locals.user;
	Sentry.captureException(error, {
		user: {
			id: user?.id || '',
			email: user?.email || '',
			username: user?.fullName || '',
		},
	});
};

export const externalFetch: ExternalFetch = async (request) => {
	// export const etternalFetch: ExternalFetch = async (request) => {
	// const basePath = 'https://localhost/api';
	const basePath = 'https://localhost/api/';
	// const newPath = 'http://backend:3002';
	const newPath = 'http://backend:3002/';
	if (request.url.startsWith(basePath)) {
		// if (request.url.startsWith('https://localhost/api')) {
		// clone the original request, but change the URL
		request = new Request(request.url.replace(basePath, newPath), request);
	}

	return fetch(request);
};
