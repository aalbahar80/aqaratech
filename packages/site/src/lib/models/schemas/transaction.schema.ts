import { falsyToNull, strToDate, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const schema = z
	.object({
		id: z.string().uuid().optional(),
		dueAt: z
			.union([z.null(), z.literal(''), z.preprocess(strToDate, z.date())])
			.transform(falsyToNull),
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
	})
	.refine(
		(val) => val.dueAt === null || val.dueAt === '' || val.postAt <= val.dueAt,
		{
			path: ['dueAt'],
			message: 'Due date cannot be after post date',
		},
	);
