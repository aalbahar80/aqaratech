// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Source: https://github.com/xpepermint/query-types/blob/master/index.js

const isObject = (val: unknown): val is object => val.constructor === Object;

const isNumber = (val: unknown): val is number =>
	!isNaN(parseFloat(val)) && isFinite(val);

const isBoolean = (val: unknown): val is boolean =>
	val === 'false' || val === 'true';

const isArray = Array.isArray;

const parseValue = (val: unknown): unknown => {
	if (typeof val === 'undefined' || val === 'undefined') {
		return undefined;
	} else if (val === 'null') {
		return null;
	} else if (isBoolean(val)) {
		return parseBoolean(val);
	} else if (isArray(val)) {
		return parseArray(val);
	} else if (isObject(val)) {
		return parseObject(val);
	} else if (isNumber(val)) {
		return parseNumber(val);
	} else {
		return val;
	}
};

export const parseObject = (obj: Record<string, unknown>) => {
	const result = {};
	for (const key in obj) {
		const val = parseValue(obj[key]);
		result[key] = val;
	}
	return result;
};

const parseArray = (arr: unknown[]) => {
	return arr.map(parseValue);
};

const parseNumber = (val: unknown) => {
	return Number(val);
};

const parseBoolean = (val: unknown) => {
	return val === 'true';
};
