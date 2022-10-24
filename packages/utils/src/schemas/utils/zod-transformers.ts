import { isNumber } from 'remeda';

export function trim<T>(v: T) {
	if (typeof v === 'string') {
		return v.trim();
	}
	return v;
}

export function falsyToNullExceptZero<T>(v: T) {
	return isNumber(v) ? v : null;
}

export function digitsOnly(v: string) {
	return v.match(/^[0-9]+$/) !== null;
}
