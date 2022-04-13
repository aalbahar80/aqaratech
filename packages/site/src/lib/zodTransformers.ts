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

// export a function that z.preprocess string or date to Date
export function strToDate(v: unknown) {
	if (typeof v === 'string' || v instanceof Date) return new Date(v);
	return;
}

// TODO Doesn't infer correctly
export function undefinedToNull<T>(v: T) {
	return v === undefined ? null : v;
}
