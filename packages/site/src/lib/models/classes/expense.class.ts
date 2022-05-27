import type { InferQueryOutput } from '$lib/client/trpc.js';
import { Entity } from '$lib/models/classes/entity.class.js';
import { AsyncSelectField, Field } from '$lib/models/classes/Field.class.js';
import { categories } from '$lib/stores/expenseMeta.js';
import { toDateInput } from '$lib/utils/common.js';
import { parseRelationOptions } from '$lib/utils/getRelationOptions.js';
import type { Expense as PExpense } from '@prisma/client';
import * as R from 'remeda';
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
		public override relationalFields = Expense.relationalFields,
	) {
		super();
	}

	defaultForm = (): z.input<typeof baseSchema> => ({
		amount: 0,
		expenseCategoryId: '',
		postAt: new Date(),
		memo: '',
		clientId: null,
		propertyId: null,
		unitId: null,
	});

	override basicFields = [
		new Field('amount', {
			required: true,
			type: 'number',
			value: this.data?.amount,
		}),
		new Field('postAt', {
			required: true,
			type: 'date',
			value: toDateInput(this.data?.postAt),
		}),
		new AsyncSelectField('expenseCategoryId', {
			required: true,
			options: categories,
			value: this.data?.expenseCategoryId || '',
			label: 'Expense Category',
		}),
		new Field('memo', {
			value: R.pathOr(this.data, ['memo'], ''),
			hint: 'Enter a short description of the expense. This will be visible to the client.',
		}),
	];

	override getRelationOptions = () => {
		const parsed = parseRelationOptions(this.data);
		this.attribution = parsed.attribution;
		return parsed.options;
	};
}
