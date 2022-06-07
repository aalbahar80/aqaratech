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
			.union([z.null(), z.literal(''), z.preprocess(strToDate, z.date())])
			.transform(falsyToNull),
		isPaid: z.boolean(),
		amount: z.number().gt(0),
		memo: z.string().transform(trim).transform(falsyToNull).nullable(),
		leaseId: z.string().uuid(),
	})
	.refine(
		(val) => {
			console.table(val);
			return val.dueAt === null || val.dueAt === '' || val.postAt <= val.dueAt;
		},
		{
			path: ['dueAt'],
			message: 'Due date cannot be after post date',
		},
	)
	.refine(
		(val) =>
			val.paidAt === null || val.paidAt === '' || val.postAt <= val.paidAt,
		{
			path: ['paidAt'],
			message: 'Payment date cannot be after post date',
		},
	)
	.refine(
		(val) => (val.isPaid && val.paidAt) || (!val.isPaid && !val.paidAt),
		(val) => ({
			path: ['paidAt'],
			message: val.isPaid
				? 'Payment date should be set if transaction is paid'
				: 'Payment date should not be set if the transaction is not paid. Clear the payment date or mark the transaction as paid.',
		}),
	);
