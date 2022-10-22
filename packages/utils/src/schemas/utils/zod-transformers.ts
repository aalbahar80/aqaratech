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

// TODO Doesn't infer correctly
export function undefinedToNull<T>(v: T) {
	return v === undefined ? null : v;
}

export function digitsOnly(v: string) {
	return v.match(/^[0-9]+$/) !== null;
}

export function nullifyEmptyString(v: string) {
	return v.trim() === '' ? null : v;
}
