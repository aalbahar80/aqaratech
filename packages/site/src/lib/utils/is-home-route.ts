import type { Locales } from '$i18n/i18n-types';

type LocaleRoute = `/${Locales}`;

export const HOME_ROUTES = ['/en', '/ar'] satisfies LocaleRoute[];

export const isHomeRoute = (pathname: string) =>
	HOME_ROUTES.includes(pathname as LocaleRoute);
