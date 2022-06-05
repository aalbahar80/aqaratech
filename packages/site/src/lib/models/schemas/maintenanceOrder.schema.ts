import { falsyToNull, strToDate, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

const baseSchema = z.object({
	id: z.string().uuid().optional(),
	title: z
		.string()
		.min(3, { message: 'Required' })
		.transform(trim)
		.transform(falsyToNull),
	description: z.string().nullable().transform(trim).transform(falsyToNull),
	status: z.string().min(1, { message: 'Required' }).nullable(),
	completedAt: z
		.union([z.null(), z.literal(''), z.preprocess(strToDate, z.date())])
		.transform(falsyToNull),
	propertyId: z.string().uuid().nullable(),
	portfolioId: z.string().uuid().nullable(),
	unitId: z.string().uuid().nullable(),
});

export const schema = baseSchema.superRefine((val, ctx) => {
	if (
		+Boolean(val.unitId) +
			+Boolean(val.propertyId) +
			+Boolean(val.portfolioId) !==
		1
		// Boolean(val.portfolioId)
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['portfolioId'],
			message: 'At least one of unit, property, or portfolio must be selected.',
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['propertyId'],
			message: 'At least one of unit, property, or portfolio must be selected.',
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['unitId'],
			message: 'At least one of unit, property, or portfolio must be selected.',
		});
	}
});
