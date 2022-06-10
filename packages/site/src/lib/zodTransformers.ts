import { isNumber } from 'remeda';

export function trim<T>(v: T) {
	if (typeof v === 'string') {
		return v.trim();
	}
	return v;
}

export function falsyToNull<T>(v: T) {
	return v || null;
}

export function falsyToNullExceptZero<T>(v: T) {
	return isNumber(v) ? v : null;
}

export function strToDate(v: unknown) {
	if (v instanceof Date) {
		return v;
	} else if (typeof v === 'string' || typeof v === 'number') {
		return new Date(v);
	} else {
		return;
	}
}

// TODO Doesn't infer correctly
export function undefinedToNull<T>(v: T) {
	return v === undefined ? null : v;
}

export function digitsOnly(v: string) {
	return v.match(/^[0-9]+$/) !== null;
}
