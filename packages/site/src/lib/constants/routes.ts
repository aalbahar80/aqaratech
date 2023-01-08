import { getRoute, PageType } from '@self/utils';

import type { Locales } from '$i18n/i18n-types';

// Auth
export const LOGIN = '/auth/login';
export const LOGOUT = '/auth/logout';
export const AUTH_CALLBACK = '/auth/callback';
export const SIGNUP = '/auth/login?screen_hint=signup';

// Pages
export const NEW_ORGANIZATION = (locale: Locales) =>
	getRoute({
		entity: 'organization',
		pageType: PageType.New,
		params: {
			lang: locale,
		},
	});
