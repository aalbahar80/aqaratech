import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

import {
	Cookie,
	formatRequestLog,
	formatResponseLog,
	isHealthCheck,
} from '@self/utils';

import { ResponseError } from '$api/openapi';
import { environment } from '$aqenvironment';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import { MAX_AGE, PREF_LOCALE } from '$lib/constants/misc';
import { sentryConfig } from '$lib/environment/sentry.config';
import { privateEnvironment } from '$lib/server/config/private-environment';
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

import type {
	Handle,
	HandleFetch,
	HandleServerError,
	RequestEvent,
} from '@sveltejs/kit';

logger.log({
	level: 'info',
	message: JSON.stringify({
		name: 'AqaratechConfig',
		AQARATECH_APP_VERSION: __AQARATECH_APP_VERSION__,
		ORIGIN: privateEnvironment.ORIGIN,
		BODY_SIZE_LIMIT: privateEnvironment.BODY_SIZE_LIMIT,
		...environment,
	}),
});

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
		new Sentry.Integrations.Http(),
	],
});

Sentry.setTag('svelteKit', 'server');

loadAllLocales();
const L = i18n();

export const handle = (async ({ event, resolve }) => {
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

	// read language slug
	const [, lang] = event.url.pathname.split('/');

	// redirect to base locale if no locale slug was found
	// NOTE: This does not check for a valid locale.
	if (!lang) {
		logger.log({
			level: 'warn',
			message: `redirecting to base locale. url: ${event.url.toString()}`,
		});

		const locale = getPreferredLocale(event.request);

		return new Response(null, {
			status: 302,
			headers: { Location: `/${locale}` },
		});
	}

	// if slug is not a locale, use base locale (e.g. api endpoints)
	const locale = isLocale(lang) ? lang : getLocale(event);
	const LL = L[locale];

	// bind locale and translation functions to current request
	event.locals.locale = locale;
	event.locals.LL = LL;

	const idToken = event.cookies.get(Cookie.idToken);
	const accessToken = event.cookies.get(Cookie.accessToken);
	const selectedRoleId = event.cookies.get(Cookie.role);

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
		const user = await getUser({ event, selectedRoleId });

		// set the role cookie if it's not yet set
		if (!selectedRoleId && user.role) {
			event.cookies.set(Cookie.role, user.role.id, {
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
			// 1. add trace
			// 2. replace html lang attribute with correct language
			// 2. replace html dir attribute with correct value
			return addTraceToHead({ html, span: spanResolve })
				.replace('%lang%', lang)
				.replace('%dir%', lang === 'ar' ? 'rtl' : 'ltr');
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
}) satisfies Handle;

export const handleError = (({ error, event }) => {
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

	errorLogger(error); // send to logtail at the end only

	if (error instanceof ResponseError) {
		return {
			message: error.response.statusText || 'An error occurred',
			status: error.response.status,
		};
	}

	return;
}) satisfies HandleServerError;

export const handleFetch = (async ({ event, request, fetch }) => {
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

	return await fetch(request);
}) satisfies HandleFetch;

/** Attempt to get the locale from the URL search params */
const getQueryLocale = (url: URL) => {
	const query = new URLSearchParams(url.search);
	return query.get(PREF_LOCALE);
};

const getPreferredLocale = (request: RequestEvent['request']) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	return detectLocale(acceptLanguageDetector);
};

const getLocale = ({ url, request }: RequestEvent) => {
	const localeQuery = getQueryLocale(url);

	if (localeQuery && isLocale(localeQuery)) {
		return localeQuery;
	} else {
		return getPreferredLocale(request);
	}
};
