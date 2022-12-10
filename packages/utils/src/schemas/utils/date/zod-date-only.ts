import { z } from 'zod';

import { nullifyEmptyString } from '../zod-nullify-empty-string';

import { isDateOnly, ISO_8601 } from './is-date-only';
import { isDatetime } from './is-date-time';

/**
 * Check if a string is a valid datestring. Fails if time is present.
 *
 * Transforms date-only strings to midnight UTC.
 */
export const zodDateOnly = z.string().transform((val, ctx) => {
	if (isDatetime(val)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: `Invalid date. Expected date format: ${ISO_8601}`,
		});

		return z.NEVER;
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

export const zodDateOnlyOptional = z.preprocess(
	nullifyEmptyString,
	zodDateOnly.nullish(),
);
