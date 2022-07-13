import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import {
	falsyToNull,
	falsyToNullExceptZero,
	trim,
} from '$lib/zodTransformers.js';
import { z } from 'zod';

// TODO remove
export const schema = z.object({
	id: zodnanoid.optional(),
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
	propertyId: zodnanoid,
});

export const createSchema = z.object({
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
	propertyId: zodnanoid,
});

export const updateSchema = createSchema.omit({ propertyId: true });
