import { trpc, type InferQueryOutput } from '$lib/client/trpc';
import { Client } from '$lib/models/classes/client.class';
import { Entity } from '$lib/models/classes/entity.class';
import { Property } from '$lib/models/classes/property.class';
import { Unit } from '$lib/models/classes/unit.class';
import type { RelationOptions } from '$lib/models/interfaces/option.interface';
import { schema as baseSchema } from '$models/schemas/expense.schema';
import type { Expense as PExpense } from '@prisma/client';
import type { z } from 'zod';

export class Expense extends Entity {
	static urlName = 'expenses' as const;
	static entity = 'expenses' as const;
	static singular = 'expense';
	static singularCap = 'Expense';
	static plural = 'expenses';
	static pluralCap = 'Expenses';
	static schema = baseSchema;
	public attribution: string | undefined = undefined;

	constructor(
		public data:
			| InferQueryOutput<'expenses:basic'>
			| InferQueryOutput<'expenses:list'>['data'][number]
			| Partial<PExpense>,
		public urlName = Expense.urlName,
		public entity = 'expenses' as const,
		public singular = 'expense',
		public singularCap = 'Expense',
		public plural = 'expenses',
		public pluralCap = 'Expenses',
		public schema = baseSchema,
	) {
		super();
	}

	defaultForm = (): z.input<typeof baseSchema> => ({
		amount: 0,
		category: '',
		postAt: new Date(),
		memo: '',
		clientId: null,
		propertyId: null,
		unitId: null,
	});

	override getRelationOptions = (data = this.data) => {
		const relations: RelationOptions = {
			client: undefined,
			property: undefined,
			unit: undefined,
			tenant: undefined,
			lease: undefined,
		};
		if ('unit' in data && data.unit) {
			this.attribution = data.unit?.id;
			relations.unit = new Unit(data.unit).toOption();
			relations.property = new Property(data.unit.property).toOption();
			relations.client = new Client(data.unit.property.client).toOption();
		} else if ('property' in data && data.property) {
			this.attribution = data.property?.id;
			relations.property = new Property(data.property).toOption();
			relations.client = new Client(data.property.client).toOption();
		} else if ('client' in data && data.client) {
			this.attribution = data.client?.id;
			relations.client = new Client(data.client).toOption();
		}
		return relations;
	};

	basicFields = ['amount', 'postAt', 'memo', 'category'] as const;

	static getList = async () => {
		const result = await trpc().query('expenses:list', { size: 20 });
		return result.data.map((data) => new Expense(data));
	};

	static async grab(id: string) {
		const data = await trpc().query('expenses:read', id);
		return new Expense(data);
	}
}
