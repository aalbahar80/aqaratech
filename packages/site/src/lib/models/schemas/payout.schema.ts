import { isID } from '$lib/models/schemas/id.schema';
import { zodIsDateRequired } from '$lib/utils/zod-validators';
import { falsyToNull, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

const updateSchema = z.object({
	amount: z.number().gt(0),
	postAt: zodIsDateRequired(),
	memo: z.string().transform(trim).transform(falsyToNull).nullable(),
});

export const createSchema = updateSchema.extend({
	organizationId: isID,
	portfolioId: isID,
});
