import trpc from '$lib/client/trpc';
import { schema } from '$models/schemas/expense.schema';
import type { Expense as PExpense } from '@prisma/client';
import type { z } from 'zod';

export class Expense {
	static urlName = 'expenses' as const;
	static entity = 'expenses' as const;
	static singular = 'expense';
	static singularCap = 'Expense';
	static plural = 'expenses';
	static pluralCap = 'Expenses';
	static schema = schema;

	constructor(public data: Partial<PExpense>) {}

	static defaultForm = (): z.input<typeof schema> => ({
		amount: 0,
		category: '',
		postAt: new Date(),
		memo: '',
		clientId: null,
		propertyId: null,
		unitId: null,
	});

	static basicFields = ['amount', 'postAt', 'memo', 'category'] as const;
	static relationalFields = [] as const;

	static getList = async () => {
		const result = await trpc.query('expenses:list', { size: 20 });
		return result.data.map((data) => new Expense(data));
	};

	static async grab(id: string) {
		const data = await trpc.query('expenses:read', id);
		return new Expense(data);
	}
}
