import { falsyToNull, strToDate, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

const base = z.object({
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
});

export const schema = base
	.refine(
		(val) => {
			console.table(val);
			return val.dueAt === null || val.dueAt === '' || val.postAt <= val.dueAt;
		},
		{
			path: ['dueAt'],
			message: 'Due date cannot be before post date',
		},
	)
	.refine(
		(val) => (val.isPaid && val.paidAt) || (!val.isPaid && !val.paidAt),
		(val) => ({
			path: ['paidAt'],
			message: val.isPaid
				? 'If this transaction is paid, you must enter a payment date'
				: 'If this transaction is not paid, you must clear the payment date',
		}),
	);

export const warnSchema = base
	.pick({ paidAt: true, postAt: true })
	.refine(
		(val) =>
			val.paidAt === null || val.paidAt === '' || val.postAt <= val.paidAt,
		{
			path: ['paidAt'],
			message: 'Payment date is before post date',
		},
	);
