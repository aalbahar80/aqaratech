import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { z } from 'zod';

const schema = z.object({
	id: z.string().uuid().optional(),
	dueAt: z.preprocess(strToDate, z.date()),
	postAt: z.preprocess(strToDate, z.date()),
	paidAt: z
		.union([
			z.preprocess(strToDate, z.date()).transform(falsyToNull),
			z.literal('').transform(() => null),
		])
		.nullish(),
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
		dueAt: new Date(),
		postAt: new Date(),
		isPaid: false,
		amount: 0,
		memo: '',
		leaseId: '',
		paidAt: '',
	}),
};

export const TransactionModel = {
	...TransactionModelBase,
	schema,
	basicFields: [
		'amount',
		'dueAt',
		'postAt',
		'isPaid',
		'paidAt',
		'memo',
	] as const,
	relationalFields: ['leaseId'] as const,
};

export const getBadge = (trx: {
	isPaid: boolean;
	dueAt: Date | null;
	postAt: Date;
}) => {
	if (trx.isPaid) {
		return {
			label: 'Paid',
			color: 'green',
		};
	} else if (trx.dueAt && trx.dueAt < new Date()) {
		return {
			label: 'Past due',
			color: 'red',
		};
	} else if (trx.postAt < new Date()) {
		return {
			label: 'Due',
			color: 'yellow',
		};
	} else {
		return {
			label: 'Not yet due',
			color: 'indigo',
		};
	}
};

// export const getMFReceiptUrl = (mfPaymentId: string) => {
// 	if (dev) {
// 		return `https://demo.myfatoorah.com/En/KWT/PayInvoice/Result?paymentId=${mfPaymentId}`;
// 	} else {
// 		return `https://portal.myfatoorah.com/En/KWT/PayInvoice/Result?paymentId=${mfPaymentId}`;
// 	}
// };
