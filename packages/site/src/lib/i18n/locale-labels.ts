import type { Locales } from '$i18n/i18n-types';

export const LOCALE_LABELS = {
	en: 'English',
	ar: 'العربية',
} satisfies Record<Locales, string>;

export const isRTL = (locale: Locales): locale is 'ar' => locale === 'ar';
