import { ResponseError } from '$api/openapi';
import { environment } from '$aqenvironment';
import { env } from '$env/dynamic/public';
import { LOGIN, LOGOUT } from '$lib/constants/routes';
import { getUser } from '$lib/server/utils/get-user';
import { validateToken } from '$lib/server/utils/validate';
import { isAuthRoute } from '$lib/utils/is-public-route';
import {
	addTraceToHead,
	extractRequestInfo,
	getSentryUser,
} from '$lib/utils/sentry/common';
import { isNotFoundError } from '$lib/utils/sentry/redirect';
import { envCheck, getSentryConfig } from '@self/utils';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit';
import { parse, serialize } from 'cookie';
import { errors } from 'jose';
// import * as Tracing from '@sentry/tracing'; // TODO: remove?

console.log('Version: ', __AQARATECH_APP_VERSION__);
console.log({
	env,
	envCheck: envCheck(),
});

const sentryConfig = getSentryConfig({
	PUBLIC_AQ_DEBUG_SENTRY: environment.PUBLIC_AQ_DEBUG_SENTRY,
	PUBLIC_AQARATECH_ENV: environment.PUBLIC_AQARATECH_ENV,
	PUBLIC_TRACE_RATE: environment.PUBLIC_TRACE_RATE,
});

console.log('AqaratechConfig', sentryConfig);

Sentry.init({
	...sentryConfig,
	// TODO use environment variable to set the DSN
	dsn: 'https://63374363bb0a4d5194497f0212c0b94f@o1210217.ingest.sentry.io/6735909',
	release: __AQARATECH_APP_VERSION__,
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http({ tracing: true, breadcrumbs: true }),
		new Sentry.Integrations.Console(),
	],
});

export const handle: Handle = async ({ event, resolve }) => {
	// if (event.url.pathname.startsWith('/api/')) {
	// 	return fetch(event.request);
	// }

	const transaction = Sentry.startTransaction({
		op: 'sveltekit.handle',
		name: event.request.method + ' ' + event.request.url,
	});

	Sentry.configureScope((scope) => {
		scope.setSpan(transaction);
	});

	const now = Date.now();
	const method = event.request.method;
	console.log(
		`${new Date().toISOString()} Request: ${method} ${event.url.href}: ${
			event.routeId
		} ${event.request.headers.get('user-agent')}`,
	);

	const spanCookies = transaction.startChild({
		op: 'sveltekit.parseCookies',
		description: 'parse cookies',
	});

	const cookies = parse(event.request.headers.get('cookie') || '');

	// A user with an expired token needs a way to re-authenticate,
	// so we don't want to validate the token if the user is trying to log in.
	// If we do want to validate it either way, we need to make sure to not place
	// the user in a redirect loop:
	// idToken expired => redirect to login => idToken expired => redirect to login => ...
	if (cookies.idToken && !isAuthRoute(event.url.pathname)) {
		try {
			console.log('validating idToken');
			await validateToken(cookies.idToken);
			event.locals.isAuthenticated = true;
			// only set idToken in locals if it is valid
			event.locals.idToken = cookies.idToken;
		} catch (e) {
			console.error(e);
			if (e instanceof errors.JWTExpired) {
				return new Response('Session expired', {
					status: 302,
					headers: {
						Location: LOGIN,
					},
				});
			} else {
				console.warn(
					`Invalid idToken: ${cookies.idToken}. Redirecting to ${LOGOUT} .`,
				);
				return new Response('', {
					status: 302,
					headers: {
						Location: LOGOUT,
					},
				});
				// Sentry.captureException(e);
			}
		}

		// attempt to get user from backend, set in locals.user
		// We don't validate accessToken in the frontend. We only pass it along to the server.
		// This will only run if the idToken is valid && the route is not public.
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
			event.locals.xRoleId = user?.role?.id;
		}
	}

	spanCookies.finish();

	if (environment.PUBLIC_AQARATECH_ENV !== 'production') {
		event.setHeaders({
			'X-Robots-Tag': 'noindex',
		});
	}

	const spanResolve = transaction.startChild({
		op: 'sveltekit.resolve',
		description: 'resolve',
	});

	const response = await resolve(event, {
		transformPageChunk({ html }) {
			return addTraceToHead({ html, span: spanResolve });
		},
	});

	spanResolve.finish();

	const maxAge = 60 * 60 * 24 * 7;

	// create new headers object to avoid mutating the original
	const headers = new Headers(response.headers);

	// https://medium.com/swlh/7-keys-to-the-mystery-of-a-missing-cookie-fdf22b012f09
	headers.append(
		'Set-Cookie',
		serialize('idToken', event.locals.idToken || '', {
			httpOnly: true,
			path: '/',
			maxAge: event.locals.idToken ? maxAge : 0,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	headers.append(
		'Set-Cookie',
		serialize('accessToken', event.locals.accessToken || '', {
			httpOnly: true,
			path: '/',
			maxAge: event.locals.accessToken ? maxAge : 0,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	headers.append(
		'Set-Cookie',
		serialize('xRoleId', event.locals.xRoleId || '', {
			httpOnly: true,
			path: '/',
			maxAge: event.locals.xRoleId ? maxAge : 0,
			sameSite: 'none', // TODO research
			secure: true,
		}),
	);

	console.log(
		`${new Date().toISOString()} Response: ${Date.now() - now}ms - ${method} ${
			event.url.pathname
		} ${response.status} - ${event.request.headers.get('user-agent')} - ${
			event.locals.user?.email
		}`,
	);

	transaction.finish();

	// create new response object to avoid mutating the original
	return new Response(response.body, {
		...response,
		status: response.status,
		statusText: response.statusText,
		headers,
	});
};

export const handleError: HandleServerError = ({ error, event }) => {
	// discard map file errors
	if (event.url.pathname.endsWith('js.map')) {
		return;
	}

	console.error(error);

	const info = extractRequestInfo(event);
	const user = getSentryUser(event.locals.user);

	console.debug({ info, user });

	if (isNotFoundError(error, event)) {
		// Most 404's are from random bots, but some may be legit.
		// So we log them to Sentry as 'info' instead of 'error'.
		// Alternate solution: https://github.com/sveltejs/kit/issues/6774#issuecomment-1246090470
		Sentry.captureEvent({
			level: 'info',
			message: 'NotFoundError (404) - HandleServerError',
			tags: {
				status: error.status,
				location: error.location,
				redirectFrom: event.url.href,
			},
			request: info,
		});
		return;
	}

	Sentry.captureException(error, {
		user,
	});

	if (error instanceof ResponseError) {
		return {
			message: error.response.statusText || 'An error occurred',
			status: error.response.status,
		};
	}

	return;
};

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	// Runs when a load uses `fetch()` on the server
	const basePath = environment.PUBLIC_API_URL;
	const newPath = environment.PUBLIC_API_URL_LOCAL;

	// request.headers.set('origin', PUBLIC_SITE_URL);

	if (basePath && newPath && request.url.startsWith(basePath)) {
		request = new Request(request.url.replace(basePath, newPath), request);
	}

	return fetch(request);
};
