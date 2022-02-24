import isNumber from 'lodash-es/isNumber.js';

export function trim(v: string) {
	return v.trim();
}

export function falsyToNull<T>(v: T) {
	return v || null;
}

export function falsyToNullExceptZero<T>(v: T) {
	return isNumber(v) ? v : null;
}
