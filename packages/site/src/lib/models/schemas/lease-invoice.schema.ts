import { isID } from '$lib/models/schemas/id.schema';
import {
	zodIsDateOptional,
	zodIsDateRequired,
} from '$lib/utils/zod-validators';
import { falsyToNull, trim } from '$lib/zodTransformers.js';
import { z } from 'zod';

export const updateSchema = z
	.object({
		dueAt: zodIsDateOptional(),
		postAt: zodIsDateRequired(),
		paidAt: zodIsDateOptional(),
		isPaid: z.boolean(),
		amount: z.number().gt(0),
		memo: z.string().transform(trim).transform(falsyToNull).nullable(),
	})
	.refine(
		(val) => {
			return (
				val.dueAt === null ||
				val.dueAt === '' ||
				Date.parse(val.postAt) <= Date.parse(val.dueAt)
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

export const createSchema = z
	.object({
		leaseId: isID,
		// dupes
		dueAt: zodIsDateOptional(),
		postAt: zodIsDateRequired(),
		paidAt: zodIsDateOptional(),
		isPaid: z.boolean(),
		amount: z.number().gt(0),
		memo: z.string().transform(trim).transform(falsyToNull).nullable(),
	})
	.refine(
		(val) => {
			return (
				val.dueAt === null ||
				val.dueAt === '' ||
				Date.parse(val.postAt) <= Date.parse(val.dueAt)
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
			Date.parse(val.postAt) <= Date.parse(val.paidAt),
		{
			path: ['paidAt'],
			message: 'Payment date is before post date',
		},
	);
