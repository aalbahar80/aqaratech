import * as R from 'remeda';

export const NAV_KEY = {
	LOCALE_SWITCH: 'LOCALE_SWITCH',
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	ACCOUNT: 'ACCOUNT',
	SETTINGS: 'SETTINGS',
} as const;

export type NavKey = (typeof NAV_KEY)[keyof typeof NAV_KEY];

export const isNavKey = (key: string): key is NavKey => {
	return Object.values(NAV_KEY).includes(key as NavKey);
};

export const hasNavKey = (
	obj: Record<string, unknown>,
): obj is { navKey: NavKey } => {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'navKey' in obj &&
		R.isString(obj['navKey']) &&
		isNavKey(obj['navKey'])
	);
};
