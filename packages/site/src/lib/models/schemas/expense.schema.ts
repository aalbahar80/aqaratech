import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import {
	falsyToNull,
	falsyToNullExceptZero,
	strToDate,
	trim,
} from '$lib/zodTransformers.js';
import { z } from 'zod';

export const updateSchema = z.object({
	amount: z.number().gt(0),
	categoryId: z
		.union([z.number(), z.string()])
		.nullable()
		.transform(falsyToNullExceptZero),
	postAt: z.preprocess(strToDate, z.date()),
	memo: z.string().transform(trim).transform(falsyToNull).nullable(),
});

export const createSchema = updateSchema.extend({
	portfolioId: zodnanoid,
	propertyId: zodnanoid.nullable(),
	unitId: zodnanoid.nullable(),
});
