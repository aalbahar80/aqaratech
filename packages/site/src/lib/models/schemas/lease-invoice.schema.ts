import { isID } from '$lib/models/schemas/nano-id.schema';
import {
	zodIsDateOptional,
	zodIsDateRequired,
} from '$lib/utils/zod-validators';
import { falsyToNull, strToDate, trim } from '$lib/zodTransformers.js';
import { z, ZodSchema } from 'zod';

const base = z.object({
	dueAt: z
		.union([z.null(), z.literal(''), z.preprocess(strToDate, z.date())])
		.transform(falsyToNull),
	postAt: zodIsDateRequired(),
	paidAt: zodIsDateOptional(),
	isPaid: z.boolean(),
	amount: z.number().gt(0),
	memo: z.string().transform(trim).transform(falsyToNull).nullable(),
});

const createBase = base.extend({
	leaseId: isID,
});

const refined = (s: ZodSchema) =>
	s
		.refine(
			(val) => {
				console.table(val);
				return (
					val.dueAt === null || val.dueAt === '' || val.postAt <= val.dueAt
				);
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

export const warnSchema = z
	.object({
		postAt: zodIsDateOptional(),
		paidAt: zodIsDateOptional(),
	})
	.refine(
		(val) =>
			val.paidAt === null ||
			val.paidAt === '' ||
			!val.postAt ||
			new Date(val.postAt) <= new Date(val.paidAt),
		{
			path: ['paidAt'],
			message: 'Payment date is before post date',
		},
	);

export const updateSchema = refined(base);
export const createSchema = refined(createBase);
