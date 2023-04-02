import '@sentry/tracing';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

import type { Locales } from '$i18n/i18n-types';
import type { Handle, RequestEvent } from '@sveltejs/kit';

import { baseLocale, detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import { PREF_LOCALE } from '$lib/constants/misc';

loadAllLocales();
const L = i18n();

export const handleLocale = (async ({ event, resolve }) => {
	let lang: Locales | null = null;
	let isValidLocale = false;

	// If we have a valid locale in the params, use it
	const langParam = event.params['lang'];
	if (langParam && isLocale(langParam)) {
		lang = langParam;
		isValidLocale = true;
	}

	// if we have a language slug, use it
	// NOTE: needed because of the lang custom matcher
	const [, langSlug] = event.url.pathname.split('/');
	if (!isValidLocale && langSlug && isLocale(langSlug)) {
		lang = langSlug;
		isValidLocale = true;
	}

	// if we've not managed to get a valid locale from the url,
	// try to get the user's preferred locale
	if (!isValidLocale) {
		const preferredLocale = getLocale(event);
		if (preferredLocale) {
			lang = preferredLocale;
			isValidLocale = true;
		}
	}

	if (!lang) {
		lang = baseLocale;
	}

	// bind locale and translation functions to current request
	const LL = L[lang];
	event.locals.locale = lang;
	event.locals.LL = LL;

	// Handle redirects to the landing page
	if (event.url.pathname === '/') {
		return new Response(null, {
			status: 302,
			headers: { Location: `/${lang}` },
		});
	}

	// Handle all other requests
	const response = await resolve(event, {
		transformPageChunk({ html }) {
			// 1. add trace
			// 2. replace html lang attribute with correct language
			// 2. replace html dir attribute with correct value
			return html
				.replace('%lang%', lang ?? baseLocale)
				.replace('%dir%', lang === 'ar' ? 'rtl' : 'ltr');
		},
	});

	return response;
}) satisfies Handle;

/** Attempt to get the locale from the URL search params */
const getQueryLocale = (url: URL) => {
	const query = new URLSearchParams(url.search);
	const locale = query.get(PREF_LOCALE);
	return locale;
};

const getBrowserLocale = (request: RequestEvent['request']) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	const locale = detectLocale(acceptLanguageDetector);
	return locale;
};

const getCookieLocale = (event: RequestEvent) => {
	const locale = event.cookies.get(PREF_LOCALE);
	return locale;
};

/** Attempt to get the locale from
 * 1. the URL search params
 * 2. the cookie
 * 3. the browser
 */
const getLocale = (event: RequestEvent) => {
	// from search params
	const localeQuery = getQueryLocale(event.url);
	if (localeQuery && isLocale(localeQuery)) {
		return localeQuery;
	}

	// from cookie
	const cookieLocale = getCookieLocale(event);
	if (cookieLocale && isLocale(cookieLocale)) {
		return cookieLocale;
	}

	// from browser
	const browserLocale = getBrowserLocale(event.request);
	if (isLocale(browserLocale)) {
		return browserLocale;
	}

	return null;
};
