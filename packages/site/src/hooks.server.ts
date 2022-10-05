import { ResponseError } from '$api/openapi';
import { environment } from '$aqenvironment';
import { env } from '$env/dynamic/public';
import { MAX_AGE } from '$lib/constants/misc';
import { getUser } from '$lib/server/utils/get-user';
import { handleInvalidToken } from '$lib/server/utils/handle-invalid-token';
import { validateToken } from '$lib/server/utils/validate';
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
	release: `site-${__AQARATECH_APP_VERSION__}`,
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

	const idToken = event.cookies.get('idToken');
	const accessToken = event.cookies.get('accessToken');
	const currentRole = event.cookies.get('role');

	// consume idToken and set user. Any redirects should be handled by layout/page load functions.
	if (idToken && accessToken) {
		// validate tokens
		try {
			await validateToken(idToken, 'idToken');
			await validateToken(accessToken, 'accessToken');
		} catch (error) {
			console.debug('Error validating token', error);
			return handleInvalidToken(event);
		}

		// get the user
		const user = await getUser({
			token: accessToken,
			selectedRoleId: currentRole,
		});

		// set the role cookie if it's not yet set
		if (!currentRole && user?.role) {
			event.cookies.set('role', user.role.id, {
				path: '/',
				maxAge: MAX_AGE,
			});
		}

		// set user in locals
		event.locals.user = user;
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

	console.log(
		`${new Date().toISOString()} Response: ${Date.now() - now}ms - ${method} ${
			event.url.pathname
		} ${response.status} - ${event.request.headers.get('user-agent')} - ${
			event.locals.user?.email
		}`,
	);

	transaction.finish();

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

	if (publicUrl && localUrl && request.url.startsWith(publicUrl)) {
		request = new Request(request.url.replace(publicUrl, localUrl), request);

		// Include cookies on server-side fetch requests in load functions
		// https://kit.svelte.dev/docs/hooks#server-hooks-handlefetch
		const cookie = event.request.headers.get('cookie');
		if (cookie) {
			request.headers.set('cookie', cookie);
		}
	}

	return fetch(request);
};
