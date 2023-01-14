import { get } from 'svelte/store';

import { locale } from '$i18n/i18n-svelte';

const formats = {
	en: {
		currency: { style: 'currency', currency: 'KWD' },
		date: { year: 'numeric', month: 'short', day: 'numeric' },
		time: { hour: 'numeric', minute: 'numeric' },
	},
	ar: {
		currency: { style: 'currency', currency: 'KWD' },
		date: { year: 'numeric', month: 'short', day: 'numeric' },
		time: { hour: 'numeric', minute: 'numeric', hour12: true },
	},
} as const;

export function fmtNumber(number: number) {
	const CL = get(locale);
	return new Intl.NumberFormat(CL).format(number);
}

export function fmtCurrency(number: number) {
	const CL = get(locale);
	return new Intl.NumberFormat(CL, formats[CL].currency).format(number);
}

export function fmtDate(date: Date) {
	const CL = get(locale);
	return new Intl.DateTimeFormat(CL, formats[CL].date).format(date);
}

export function fmtMonth(date: Date) {
	const CL = get(locale);
	return new Intl.DateTimeFormat(CL, { month: 'short' }).format(date);
}

export function fmtTime(date: Date) {
	const CL = get(locale);
	return new Intl.DateTimeFormat(CL, formats[CL].time).format(date);
}
