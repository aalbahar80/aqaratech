import { trpc, type InferQueryOutput } from '$lib/client/trpc';
import { Client } from '$lib/models/classes/client.class';
import { Property } from '$lib/models/classes/property.class';
import { Unit } from '$lib/models/classes/unit.class';
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

	static getRelationOptions = (data: InferQueryOutput<`expenses:basic`>) => {
		return {
			client: data?.client
				? new Client(data.client).toOption()
				: data?.property?.client
				? new Client(data.property.client).toOption()
				: data?.unit?.property?.client
				? new Client(data.unit.property.client).toOption()
				: undefined,
			property: data?.property
				? new Property(data.property).toOption()
				: data?.unit?.property
				? new Property(data.unit.property).toOption()
				: undefined,
			unit: data?.unit ? new Unit(data.unit).toOption() : undefined,
			tenant: undefined,
			lease: undefined,
		};
	};

	static basicFields = ['amount', 'postAt', 'memo', 'category'] as const;
	static relationalFields = [] as const;

	static getList = async () => {
		const result = await trpc().query('expenses:list', { size: 20 });
		return result.data.map((data) => new Expense(data));
	};

	static async grab(id: string) {
		const data = await trpc().query('expenses:read', id);
		return new Expense(data);
	}
}
