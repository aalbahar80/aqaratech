import { isMatch } from 'date-fns';
import { z } from 'zod';

// Reference: https://date-fns.org/v2.29.3/docs/isMatch
//
// Date only format
const ISO_8601 = 'yyyy-MM-dd';

// ISO8601 timestamp format 2021-01-01T00:00:00.000Z
const ISO_8601_WITH_TIME = "yyyy-MM-dd'T'HH:mm:ss.SSSxxx";

// TODO: add date validator
/**
 * Currently only checks for a string
 */
export const zodIsDateOnlyOptional = () => z.string().nullish();

/**
 * Check if a string is a valid datestring
 */
export const zodIsDateString = () =>
	z.string().transform((val, ctx) => {
		if (isMatch(val, ISO_8601_WITH_TIME) && val.length === 24) {
			// return val.endsWith('00:00:00.000Z');
			return val;
		} else if (isMatch(val, ISO_8601) && val.length === 10) {
			return new Date(val).toISOString();
		} else {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Invalid date',
			});

			return z.NEVER;
		}
	});
