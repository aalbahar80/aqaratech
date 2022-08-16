import { isID } from '$lib/models/schemas/id.schema';
import { zodIsDateRequired } from '$lib/utils/zod-validators';
import { falsyToNull, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const updateSchema = z.object({
	amount: z.number().gt(0),
	categoryId: z.string().nullable().transform(falsyToNull),
	postAt: zodIsDateRequired(),
	memo: z.string().transform(trim).transform(falsyToNull).nullable(),
	organizationId: isID,
});

export const createSchema = updateSchema.extend({
	portfolioId: isID,
	propertyId: isID.nullable(),
	unitId: isID.nullable(),
});
