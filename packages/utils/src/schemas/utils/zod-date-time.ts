import { z } from 'zod';
import { isDateOnly } from './date/is-date-only';
import { isDatetime } from './date/is-date-time';

/**
 * Check if a string is a valid datestring or datetime string.
 *
 * Transforms date-only strings to midnight UTC.
 */
export const zodDatetime = () =>
	z.string().transform((val, ctx) => {
		if (isDatetime(val)) {
			// return val.endsWith('00:00:00.000Z');
			return val;
		} else if (isDateOnly(val)) {
			return new Date(val).toISOString();
		} else {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Invalid date',
			});

			return z.NEVER;
		}
	});
