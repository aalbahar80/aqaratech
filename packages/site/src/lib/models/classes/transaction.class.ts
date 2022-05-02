import trpc from '$lib/client/trpc';
import type { Transaction as PTransaction } from '@prisma/client';
import type { z } from 'zod';
import { schema } from '../schemas/transaction.schema';

export class Transaction {
	static urlName = 'transactions';
	static singular = 'transaction';
	static singularCap = 'Transaction';
	static plural = 'transactions';
	static pluralCap = 'Transactions';
	static schema = schema;
	constructor(public data: Partial<PTransaction>) {}
	static defaultForm = (): z.input<typeof schema> => ({
		dueAt: new Date(),
		postAt: new Date(),
		isPaid: false,
		amount: 0,
		memo: '',
		leaseId: '',
		paidAt: '',
	});
	static basicFields = [
		'amount',
		'dueAt',
		'postAt',
		'isPaid',
		'paidAt',
		'memo',
	] as const;
	static getList = async () => {
		const result = await trpc.query('transactions:list', { size: 20 });
		return result.data.map((data) => new Transaction(data));
	};
	static async grab(id: string) {
		const data = await trpc.query('transactions:read', id);
		return new Transaction(data);
	}
}
