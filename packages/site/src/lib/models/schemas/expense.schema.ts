import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import { z } from 'zod';

const baseSchema = z.object({
	id: z.string().uuid().optional(),
	amount: z.number().gt(0),
	category: z.string().min(1, { message: 'Required' }),
	postAt: z.preprocess(strToDate, z.date()),
	memo: z.string().transform(trim).transform(falsyToNull).nullable(),
	clientId: z.string().uuid().nullable(),
	propertyId: z.string().uuid().nullable(),
	unitId: z.string().uuid().nullable(),
});

export const schema = baseSchema.superRefine((val, ctx) => {
	if (
		+Boolean(val.unitId) + +Boolean(val.propertyId) + +Boolean(val.clientId) !==
		1
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['clientId'],
			message: 'At least one of unit, property, or client must be selected.',
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['propertyId'],
			message: 'At least one of unit, property, or client must be selected.',
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['unitId'],
			message: 'At least one of unit, property, or client must be selected.',
		});
	}
});
