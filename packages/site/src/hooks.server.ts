import { ResponseError } from '$api/openapi';
import { environment } from '$aqenvironment';
import { env } from '$env/dynamic/public';
import { MAX_AGE } from '$lib/constants/misc';
import { sentryConfig } from '$lib/environment/sentry.config';
import type { User } from '$lib/models/types/auth.type';
import { logger } from '$lib/server/logger';
import { getUser } from '$lib/server/utils/get-user';
import { handleInvalidToken } from '$lib/server/utils/handle-invalid-token';
import { validateToken } from '$lib/server/utils/validate';
import {
	addTraceToHead,
	extractRequestInfo,
	getSentryUser,
} from '$lib/utils/sentry/common';
import { isNotFoundError } from '$lib/utils/sentry/redirect';
import { Cookie, envCheck, isHealthCheck } from '@self/utils';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import {
	error,
	type Handle,
	type HandleFetch,
	type HandleServerError,
} from '@sveltejs/kit';
// import * as Tracing from '@sentry/tracing'; // TODO: remove?

logger.info('Version: %O', __AQARATECH_APP_VERSION__);

logger.info('$env/dynamic/public %O', env);

logger.info('process.env check:');
envCheck();

logger.info('AqaratechConfig %O', sentryConfig);

Sentry.init({
	...sentryConfig,
	dsn: 'https://63374363bb0a4d5194497f0212c0b94f@o1210217.ingest.sentry.io/6735909',
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

	// TODO: drop all js.map requests early?

	const transaction = Sentry.startTransaction({
		op: 'http.server',
		// op: 'middleware.handle',
		name: event.request.method + ' ' + event.request.url,
		description: 'sveltekit.handle',
	});

	Sentry.configureScope((scope) => {
		scope.setSpan(transaction);
	});

	const now = Date.now();
	const method = event.request.method;

	logger.log({
		level: isHealthCheck(event.url.pathname) ? 'silly' : 'info',
		message: `Request: ${method} ${event.url.href}: ${
			event.routeId
		} ${event.request.headers.get('user-agent')}`,
	});

	const spanCookies = transaction.startChild({
		op: 'http.server',
		description: 'parse cookies and get user',
	});

	const idToken = event.cookies.get(Cookie.idToken);
	const accessToken = event.cookies.get(Cookie.accessToken);
	const currentRole = event.cookies.get(Cookie.role);

	// consume idToken and set user. Any redirects should be handled by layout/page load functions.
	if (idToken && accessToken) {
		// validate tokens
		try {
			await validateToken(idToken, Cookie.idToken);
			await validateToken(accessToken, Cookie.accessToken);
		} catch (error) {
			console.debug('Error validating token', error);
			return handleInvalidToken(event);
		}

		// get the user
		let user: User | undefined;

		try {
			user = await getUser({
				event,
				selectedRoleId: currentRole,
			});
		} catch (err) {
			// An error here means that the we were not able to connect to the backend.
			console.error('Error getting user', err);
			throw error(502, {
				message: 'Encountered an error while connecting to the backend',
			});
		}

		// set the role cookie if it's not yet set
		if (!currentRole && user?.role) {
			event.cookies.set('role', user.role.id, {
				path: '/',
				maxAge: MAX_AGE,
			});
		}

		// set user in locals
		event.locals.user = user;

		Sentry.configureScope((scope) => {
			scope.setUser(getSentryUser(event.locals.user));
		});
	}

	spanCookies.finish();

	if (environment.PUBLIC_AQARATECH_ENV !== 'production') {
		event.setHeaders({
			'X-Robots-Tag': 'noindex',
		});
	}

	const spanResolve = transaction.startChild({
		op: 'http.server',
		description: 'handle.resolve',
	});

	const response = await resolve(event, {
		transformPageChunk({ html }) {
			return addTraceToHead({ html, span: spanResolve });
		},
	});

	spanResolve.finish();

	logger.log({
		level: isHealthCheck(event.url.pathname) ? 'silly' : 'info',
		message: `Response: ${response.status} - ${
			Date.now() - now
		}ms - ${method} ${event.url.pathname} - ${event.request.headers.get(
			'user-agent',
		)} - ${event.locals.user?.email}`,
	});

	// Close the Sentry transaction
	transaction.finish();

	// Unset the Sentry user on the scope
	Sentry.configureScope((scope) => {
		scope.setUser(null);
	});

	return response;
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

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	// Runs when a load uses `fetch()` on the server
	const publicUrl = environment.PUBLIC_API_URL;
	const localUrl = environment.PUBLIC_API_URL_LOCAL;

	// Bypass the public internet when calling our backend from sveltekit server
	if (publicUrl && localUrl && request.url.startsWith(publicUrl)) {
		request = new Request(request.url.replace(publicUrl, localUrl), request);
	}

	// Include cookies to any server-side fetch request to the backend
	// These happend either in load functions or in the handle hook (when calling getUser)
	// https://kit.svelte.dev/docs/hooks#server-hooks-handlefetch
	if (request.url.startsWith(publicUrl) || request.url.startsWith(localUrl)) {
		const cookie = event.request.headers.get('cookie');
		if (cookie) {
			request.headers.set('cookie', cookie);
		}
	}

	return fetch(request);
};
