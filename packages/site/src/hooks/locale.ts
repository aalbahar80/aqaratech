import '@sentry/tracing';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

import type { Handle, RequestEvent } from '@sveltejs/kit';

import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import { PREF_LOCALE } from '$lib/constants/misc';
import { logger } from '$lib/server/logger';

loadAllLocales();
const L = i18n();

export const handleLocale = (async ({ event, resolve }) => {
	// read language slug
	const [, lang] = event.url.pathname.split('/');

	// redirect to base locale if no locale slug was found
	// NOTE: This does not check for a valid locale.
	if (!lang) {
		logger.log({
			level: 'debug',
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

	const response = await resolve(event, {
		transformPageChunk({ html }) {
			// 1. add trace
			// 2. replace html lang attribute with correct language
			// 2. replace html dir attribute with correct value
			return html
				.replace('%lang%', lang)
				.replace('%dir%', lang === 'ar' ? 'rtl' : 'ltr');
		},
	});

	return response;
}) satisfies Handle;

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
