import {
	falsyToNull,
	falsyToNullExceptZero,
	trim,
} from '$lib/zodTransformers.js';
import { z } from 'zod';

export const schema = z.object({
	id: z.string().uuid().optional(),
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
	propertyId: z.string().uuid(),
});
