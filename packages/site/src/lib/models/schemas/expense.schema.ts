import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import { zodIsDateRequired } from '$lib/utils/zod-validators';
import {
	falsyToNull,
	falsyToNullExceptZero,
	trim,
} from '$lib/zodTransformers.js';
import { z } from 'zod';

export const updateSchema = z.object({
	amount: z.number().gt(0),
	categoryId: z
		.union([z.number(), z.string()])
		.nullable()
		.transform(falsyToNullExceptZero),
	postAt: zodIsDateRequired(),
	memo: z.string().transform(trim).transform(falsyToNull).nullable(),
});

export const createSchema = updateSchema.extend({
	portfolioId: zodnanoid,
	propertyId: zodnanoid.nullable(),
	unitId: zodnanoid.nullable(),
});
