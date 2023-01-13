import type { Locales } from '$i18n/i18n-types';

const formats = {
	en: {
		number: {},
		currency: { style: 'currency', currency: 'KWD' },
		date: { year: 'numeric', month: 'short', day: 'numeric' },
		time: { hour: 'numeric', minute: 'numeric' },
	},
	ar: {
		number: {},
		currency: { style: 'currency', currency: 'KWD' },
		date: { year: 'numeric', month: 'short', day: 'numeric' },
		time: { hour: 'numeric', minute: 'numeric', hour12: true },
	},
} as const;

export function fmtNumber(number: number, locale: Locales) {
	return new Intl.NumberFormat(locale, formats[locale].number).format(number);
}

export function fmtCurrency(number: number, locale: Locales) {
	return new Intl.NumberFormat(locale, formats[locale].currency).format(number);
}

export function fmtDate(date: Date, locale: Locales) {
	return new Intl.DateTimeFormat(locale, formats[locale].date).format(date);
}

export function fmtTime(date: Date, locale: Locales) {
	return new Intl.DateTimeFormat(locale, formats[locale].time).format(date);
}
