import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import { falsyToNull, strToDate, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const updateSchema = z.object({
	amount: z.number().gt(0),
	// categoryId: z.number({ invalid_type_error: 'Required' }),
	postAt: z.preprocess(strToDate, z.date()),
	memo: z.string().transform(trim).transform(falsyToNull).nullable(),
});

export const createSchema = updateSchema
	.extend({
		portfolioId: zodnanoid.nullable(),
		propertyId: zodnanoid.nullable(),
		unitId: zodnanoid.nullable(),
	})
	.superRefine((val, ctx) => {
		if (
			+Boolean(val.unitId) +
				+Boolean(val.propertyId) +
				+Boolean(val.portfolioId) <
			1
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['portfolioId'],
				message:
					'At least one of unit, property, or portfolio must be selected.',
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['propertyId'],
				message:
					'At least one of unit, property, or portfolio must be selected.',
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['unitId'],
				message:
					'At least one of unit, property, or portfolio must be selected.',
			});
		}
	});
