import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Entity } from '$lib/models/classes/entity.class.js';
import { parseRelationOptions } from '$lib/utils/getRelationOptions.js';
import type { Expense as PExpense } from '@prisma/client';
import type { z } from 'zod';
import { schema as baseSchema } from '../schemas/expense.schema.js';

export class Expense extends Entity {
	static urlName = 'expenses' as const;
	static entity = 'expenses' as const;
	static singular = 'expense';
	static singularCap = 'Expense';
	static plural = 'expenses';
	static pluralCap = 'Expenses';
	static schema = baseSchema;
	public attribution: string | undefined = undefined;
	static relationalFields = ['clientId', 'propertyId', 'unitId'] as const;
	static basicFields = ['amount', 'postAt', 'memo', 'category'] as const;

	constructor(
		public data?:
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
		public override basicFields = Expense.basicFields,
		public override relationalFields = Expense.relationalFields,
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

	override getRelationOptions = () => {
		const parsed = parseRelationOptions(this.data);
		this.attribution = parsed.attribution;
		return parsed.options;
	};
}
