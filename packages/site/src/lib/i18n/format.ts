import { get } from 'svelte/store';
import { fmt } from '@self/utils';

import { locale } from '$i18n/i18n-svelte';

// Number
export function fmtNumber(number: number) {
	const CL = get(locale);
	return fmt({ locale: CL, type: 'number', value: number });
}

// Currency
export function fmtCurrency(number: number) {
	const CL = get(locale);
	return fmt({ locale: CL, type: 'currency', value: number });
}

// Date
export function fmtDate(date: Date | string) {
	const CL = get(locale);
	return fmt({ locale: CL, type: 'date', value: date });
}

export function fmtMonth(date: Date) {
	const CL = get(locale);
	return fmt({ locale: CL, type: 'month', value: date });
}

export function fmtTime(date: Date) {
	const CL = get(locale);
	return fmt({ locale: CL, type: 'time', value: date });
}
