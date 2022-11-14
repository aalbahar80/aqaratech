import { z } from 'zod';

const tryParseToNumber = (val: unknown) => {
	if (typeof val === 'string') {
		const num = parseInt(val);

		// return num; // this could be NaN
		return isNaN(num) ? null : num;
	} else {
		return val;
	}
};

/**
 * Preprocess string values to numbers before parsing.
 *
 * `Nan` values are converted to `null`, _not_ 0.
 */
export const zodNumber = z.preprocess(tryParseToNumber, z.number());

/**
 * Preprocess string values to numbers before parsing.
 *
 * `Nan` values are converted to `null`, _not_ 0.
 */
export const zodNumberOptional = z.preprocess(
	tryParseToNumber,
	z.number().nullish(),
);
