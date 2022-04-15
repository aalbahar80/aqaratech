import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { z } from 'zod';

const schema = z.object({
	id: z.string().uuid().optional(),
	dueDate: z.preprocess(strToDate, z.date()),
	postDate: z.preprocess(strToDate, z.date()),
	isPaid: z.boolean(),
	amount: z.number().gt(0),
	memo: z.string().transform(trim).transform(falsyToNull).nullable(),
	leaseId: z.string().uuid(),
});

const TransactionModelBase: IEntity<'transactions'> = {
	name: 'transactions',
	singular: 'transaction',
	singularCap: 'Transaction',
	plural: 'transactions',
	pluralCap: 'Transactions',
	defaultForm: () => ({
		dueDate: new Date(),
		postDate: new Date(),
		isPaid: false,
		amount: 0,
		memo: '',
		leaseId: '',
	}),
};

export const TransactionModel = {
	...TransactionModelBase,
	schema,
	basicFields: ['amount', 'dueDate', 'postDate', 'isPaid', 'memo'] as const,
	relationalFields: ['leaseId'] as const,
};

export const getBadge = (trx: { isPaid: boolean; dueDate: Date }) => {
	if (trx.isPaid) {
		return {
			label: 'Paid',
			color: 'green',
		};
	}
	if (trx.dueDate < new Date()) {
		return {
			label: 'Past due',
			color: 'red',
		};
	}
	return {
		label: 'Not yet due',
		color: 'indigo',
	};
};
