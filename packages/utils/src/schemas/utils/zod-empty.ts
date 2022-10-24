import { z } from 'zod';

/**
 *
 * If value is (`""`, `null`, or `undefined`) it will be transformed to null.
 *
 * If anything else is provided this schema will fail and leave the
 * actual validation to the other half of the union.
 *
 * Usage: Add this to a union with any other schema to make it optional.
 */
export const zodEmpty = () =>
	z
		.string()
		.transform((val, ctx) => {
			if (val === '') {
				return null;
			} else {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
				});
				return z.NEVER;
			}
		})
		.nullish();
