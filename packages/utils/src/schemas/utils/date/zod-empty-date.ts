import { z } from 'zod';

/**
 * Add this to a union with a date schema to make it optional.
 *
 * If value is ('', null, or undefined) it will be transformed to null.
 *
 * If anything else is provided it this schema will fail and leave the
 * actual date validation to the other half of the union.
 */
export const zodEmptyDate = () =>
	z
		.string()
		.transform((val, ctx) => {
			if (val === '') {
				return null;
			} else {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'Invalid date',
				});
				return z.NEVER;
			}
		})
		.nullish();
