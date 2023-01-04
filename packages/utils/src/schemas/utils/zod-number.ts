import { z } from 'zod';

const tryParseToNumber = (val: unknown) => {
	if (typeof val !== 'string') {
		return val;
	} else if (val.trim().length === 0) {
		// transform empty strings to null before passing them to Number(''), which returns 0
		return null;
	} else {
		const num = Number(val);

		return isNaN(num) ? null : num;
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
