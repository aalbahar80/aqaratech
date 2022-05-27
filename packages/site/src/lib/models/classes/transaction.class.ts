import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Entity } from '$lib/models/classes/entity.class.js';
import { Field } from '$lib/models/classes/Field.class.js';
import { Lease } from '$lib/models/classes/lease.class.js';
import { toDateInput } from '$lib/utils/common.js';
import type { Transaction as PTransaction } from '@prisma/client';
import * as R from 'remeda';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/transaction.schema.js';

export class Transaction extends Entity {
	static urlName = 'transactions' as const;
	static singular = 'transaction';
	static singularCap = 'Transaction';
	static plural = 'transactions';
	static pluralCap = 'Transactions';
	static schema = baseSchema;
	static relationalFields = ['leaseId'] as const;

	constructor(
		public data:
			| InferQueryOutput<'transactions:basic'>
			| InferQueryOutput<'transactions:read'>
			| InferQueryOutput<'transactions:list'>['data'][number]
			| Partial<PTransaction>,
		public urlName = Transaction.urlName,
		public singular = 'transaction',
		public singularCap = 'Transaction',
		public plural = 'transactions',
		public pluralCap = 'Transactions',
		public schema = baseSchema,
		public override relationalFields = Transaction.relationalFields,
	) {
		super();
	}

	override basicFields = [
		new Field('amount', {
			type: 'number',
			required: true,
			value: this.data.amount,
			label: 'Amount (KWD)',
		}),
		new Field('postAt', {
			type: 'date',
			required: true,
			value: toDateInput(R.pathOr(this.data, ['postAt'], '')),
			label: 'Post Date',
		}),
		new Field('dueAt', {
			type: 'date',
			value: toDateInput(this.data.dueAt),
			label: 'Due Date',
		}),
		new Field('isPaid', {
			type: 'checkbox',
			value: this.data.isPaid,
			label: 'Paid',
		}),
		// new Field('paidAt', {
		// 	type: 'date',
		// 	value: toDateInput(R.pathOr(this.data, ['paidAt'], '')),
		// 	label: 'Payment Date',
		// }),
		new Field('memo', {
			value: R.pathOr(this.data, ['memo'], ''),
			hint: 'Enter a short description of the transaction. This will be visible to the tenant.',
		}),
	];

	defaultForm = (): z.input<typeof baseSchema> => ({
		dueAt: new Date(),
		postAt: new Date(),
		isPaid: false,
		amount: 0,
		memo: '',
		leaseId: '',
		paidAt: '',
	});

	override getRelationOptions = () => ({
		lease:
			'lease' in this.data ? new Lease(this.data.lease).toOption() : undefined,
		client: undefined,
		property: undefined,
		unit: undefined,
		tenant: undefined,
	});

	static getBadge = (trx: {
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
}
