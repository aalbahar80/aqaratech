import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Entity } from '$lib/models/classes/entity.class.js';
import { Lease } from '$lib/models/classes/lease.class.js';
import { schema as baseSchema } from '../schemas/transaction.schema.js';
import type { Transaction as PTransaction } from '@prisma/client';
import type { z } from 'zod';

export class Transaction extends Entity {
	static urlName = 'transactions' as const;
	static singular = 'transaction';
	static singularCap = 'Transaction';
	static plural = 'transactions';
	static pluralCap = 'Transactions';
	static schema = baseSchema;
	static relationalFields = ['tenantId', 'leaseId'] as const;
	static basicFields = [
		'amount',
		'dueAt',
		'postAt',
		'isPaid',
		'paidAt',
		'memo',
	] as const;

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
		public override basicFields = Transaction.basicFields,
	) {
		super();
	}

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
