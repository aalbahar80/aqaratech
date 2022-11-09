import { ResponseError } from '$api/openapi';
import { environment } from '$aqenvironment';
import { env } from '$env/dynamic/public';
import { MAX_AGE } from '$lib/constants/misc';
import { sentryConfig } from '$lib/environment/sentry.config';
import type { User } from '$lib/models/types/auth.type';
import { logger } from '$lib/server/logger';
import { errorLogger } from '$lib/server/logger/error-logger';
import { getUser } from '$lib/server/utils/get-user';
import { handleInvalidToken } from '$lib/server/utils/handle-invalid-token';
import { validateToken } from '$lib/server/utils/validate';
import {
	addTraceToHead,
	extractRequestInfo,
	getSentryUser,
} from '$lib/utils/sentry/common';
import { isNotFoundError } from '$lib/utils/sentry/redirect';
import {
	Cookie,
	envCheck,
	formatRequestLog,
	formatResponseLog,
	isHealthCheck,
} from '@self/utils';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import {
	error,
	type Handle,
	type HandleFetch,
	type HandleServerError,
} from '@sveltejs/kit';
// import * as Tracing from '@sentry/tracing'; // TODO: remove?

logger.log({
	level: 'info',
	message: JSON.stringify({
		name: 'AqaratechConfig',
		AQARATECH_APP_VERSION: __AQARATECH_APP_VERSION__,
		...env,
	}),
});

envCheck();

logger.log({
	level: 'info',
	message: JSON.stringify({
		name: 'SentryConfig',
		...sentryConfig,
	}),
});

Sentry.init({
	...sentryConfig,
	dsn: 'https://63374363bb0a4d5194497f0212c0b94f@o1210217.ingest.sentry.io/6735909',
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http({ tracing: true, breadcrumbs: true }),
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

	const start = Date.now();

	if (!isHealthCheck(event.url.pathname)) {
		logger.http(
			formatRequestLog({
				request: event.request,
				url: event.url,
				extra: {
					user: event.locals.user?.email ?? null,
					userAgent: event.request.headers.get('user-agent'),
				},
			}),
		);
	}

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
			logger.log({
				level: 'debug',
				message: 'Invalid token',
			});

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
			logger.log({
				level: 'error',
				message: 'Error getting user',
			});

			errorLogger(err);

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

	if (!isHealthCheck(event.url.pathname)) {
		logger.http(
			formatResponseLog({
				response,
				method: event.request.method,
				start,
				url: event.url,
				extra: {
					user: event.locals.user?.email ?? null,
				},
			}),
		);
	}

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

	errorLogger(error);

	const info = extractRequestInfo(event);
	const user = getSentryUser(event.locals.user);

	logger.debug({ info, user });

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
