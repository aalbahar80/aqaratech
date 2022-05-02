import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import { z } from 'zod';

export const schema = z.object({
	id: z.string().uuid().optional(),
	dueAt: z.preprocess(strToDate, z.date()),
	postAt: z.preprocess(strToDate, z.date()),
	paidAt: z
		.union([
			z.preprocess(strToDate, z.date()).transform(falsyToNull),
			z.literal('').transform(() => null),
		])
		.nullable(),
	isPaid: z.boolean(),
	amount: z.number().gt(0),
	memo: z.string().transform(trim).transform(falsyToNull).nullable(),
	leaseId: z.string().uuid(),
});
