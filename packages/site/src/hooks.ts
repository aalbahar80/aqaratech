import { dev } from '$app/env';
import { environment } from '$environment';
import { getUser } from '$lib/server/utils/get-user';
import { validateToken } from '$lib/server/utils/validate';
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

export const getSession: GetSession = async ({ locals }) => {
	// If idToken validation fails, we set both user and isAuthenticated to false
	// even though locals.user was populated using a valid accessToken.
	return {
		user: locals.isAuthenticated ? locals.user : undefined,
		accessToken: locals.accessToken ?? '',
		isAuthenticated: locals.isAuthenticated,
	};
};

export const handle: Handle = async ({ event, resolve }) => {
	const now = Date.now();
	const method = event.request.method;
	console.log(
		`${new Date().toISOString()} Request: ${method} ${event.url.href}: ${
			event.routeId
		} ${event.request.headers.get('user-agent')}`,
	);

	const cookies = parse(event.request.headers.get('cookie') || '');

	// Validate idToken, set locals.isAuthenticated to true if valid
	let isAuthenticated = false;
	if (cookies.idToken) {
		try {
			await validateToken(cookies.idToken);
			isAuthenticated = true;
			// only set idToken in locals if it is valid
			event.locals.idToken = cookies.idToken;
		} catch (e) {
			console.error(e);
			Sentry.captureException(e);
		}
	}
	event.locals.isAuthenticated = isAuthenticated;

	// attempt to get user from backend, set in locals.user
	// We don't validate accessToken in the frontend. We only pass it along to the server.
	if (cookies.accessToken) {
		// Don't try to get user if we don't have an accessToken
		// TODO what about public pages? what about public pages when a user is signed in?
		const user = await getUser({
			token: cookies.accessToken,
			selectedRoleId: cookies.xRoleId,
		});
		event.locals.user = user;
		event.locals.accessToken = cookies.accessToken;

		// Place `xRoleId` in locals for it be picked up after `resolve` has been called.
		// After `resolve` is called, xRoleId is serialized into a cookie to persist the role change.
		// Additionally, if the user never changes roles,
		// this will take care of setting & persisting the default role.
		event.locals.xRoleId = user?.role.id;
	}

	const response = await resolve(event);

	console.log(
		`${new Date().toISOString()} Response: ${Date.now() - now}ms - ${method} ${
			event.url.pathname
		} ${response.status} - ${event.request.headers.get('user-agent')} - ${
			event.locals.user?.email
		}`,
	);

	const maxAge = 60 * 60 * 24 * 7;

	response.headers.append(
		'Set-Cookie',
		serialize('idToken', event.locals.idToken || '', {
			httpOnly: true,
			path: '/',
			maxAge: event.locals.idToken ? maxAge : 0,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		serialize('accessToken', event.locals.accessToken || '', {
			httpOnly: true,
			path: '/',
			maxAge: event.locals.accessToken ? maxAge : 0,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	response.headers.append(
		'Set-Cookie',
		serialize('xRoleId', event.locals.xRoleId || '', {
			httpOnly: true,
			path: '/',
			maxAge: event.locals.xRoleId ? maxAge : 0,
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
	const basePath = import.meta.env.VITE_API_URL;
	const newPath = import.meta.env.VITE_API_URL_LOCAL;

	if (basePath && newPath && request.url.startsWith(basePath)) {
		request = new Request(request.url.replace(basePath, newPath), request);
	}

	return fetch(request);
};
