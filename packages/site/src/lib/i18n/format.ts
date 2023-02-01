import { get } from 'svelte/store';

import { locale } from '$i18n/i18n-svelte';

const formats = {
	currency: {
		style: 'currency',
		currency: 'KWD',
		compactDisplay: 'short',
		maximumFractionDigits: 0, // Don't show cents
		// notation: 'compact',
	} satisfies Intl.NumberFormatOptions,

	date: {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	} satisfies Intl.DateTimeFormatOptions,

	month: { month: 'short' } satisfies Intl.DateTimeFormatOptions,

	time: {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	} satisfies Intl.DateTimeFormatOptions,
};

// Number
export function fmtNumber(number: number) {
	const CL = get(locale);
	return new Intl.NumberFormat(CL).format(number);
}

// Currency
export function fmtCurrency(
	number: number,
	options?: Intl.NumberFormatOptions,
) {
	const CL = get(locale);
	return new Intl.NumberFormat(CL, {
		...formats.currency,
		...options,
	}).format(number);
}

// Date
export function fmtDate(date: Date | string) {
	const value = typeof date === 'string' ? new Date(date) : date;

	const CL = get(locale);
	return new Intl.DateTimeFormat(CL, formats.date).format(value);
}

export function fmtMonth(date: Date) {
	const CL = get(locale);
	return new Intl.DateTimeFormat(CL, formats.month).format(date);
}

export function fmtTime(date: Date) {
	const CL = get(locale);
	return new Intl.DateTimeFormat(CL, formats.time).format(date);
}
