import { isID } from '$lib/models/schemas/id.schema';
import {
	falsyToNull,
	falsyToNullExceptZero,
	trim,
} from '$lib/zodTransformers.js';
import { z } from 'zod';

export const updateSchema = z.object({
	id: isID.optional(),
	label: z.string().nullable().transform(trim).transform(falsyToNull),
	unitNumber: z
		.string()
		.refine((val) => val.trim().length > 0, { message: 'Required' })
		.transform(trim),
	bed: z
		.union([z.literal(''), z.null(), z.undefined(), z.number().nonnegative()])
		.transform(falsyToNullExceptZero),
	bath: z
		.union([z.literal(''), z.null(), z.undefined(), z.number().nonnegative()])
		.transform(falsyToNullExceptZero),
	size: z
		.union([z.literal(''), z.null(), z.undefined(), z.number().nonnegative()])
		.transform(falsyToNullExceptZero),
	floor: z
		.union([z.literal(''), z.null(), z.undefined(), z.number()])
		.transform(falsyToNullExceptZero),
	usage: z.string().nullable().transform(trim).transform(falsyToNull),
	type: z.string().nullable().transform(trim).transform(falsyToNull),
	marketRent: z
		.number()
		.nonnegative()
		.nullish()
		.transform(falsyToNullExceptZero),
	organizationId: isID,
});

export const createSchema = updateSchema.extend({
	portfolioId: isID,
	propertyId: isID,
});
