import { isID } from '$lib/models/schemas/id.schema';
import { zodIsDateRequired } from '$lib/utils/zod-validators';
import { z } from 'zod';

const updateSchema = z.object({
	amount: z.number().gt(0),
	postAt: zodIsDateRequired(),
});

export const createSchema = updateSchema.extend({
	organizationId: isID,
	portfolioId: isID,
});
