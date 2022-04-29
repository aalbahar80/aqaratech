import { falsyToNull, strToDate, trim } from '$lib/zodTransformers';
import type { IEntity } from '$models/interfaces/entity.interface';
import { z } from 'zod';

const schema = z.object({
	id: z.string().uuid().optional(),
	amount: z.number().gt(0),
	category: z.string().min(1, { message: 'Required' }),
	postAt: z.preprocess(strToDate, z.date()),
	memo: z.string().transform(trim).transform(falsyToNull).nullable(),
	clientId: z.string().uuid().nullable(),
	propertyId: z.string().uuid().nullable(),
	unitId: z.string().uuid().nullable(),
});

const withAttribution = schema.superRefine((val, ctx) => {
	if (
		+Boolean(val.unitId) + +Boolean(val.propertyId) + +Boolean(val.clientId) !==
		1
	) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['clientId'],
			message: 'At least one of unit, property, or client must be selected.',
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['propertyId'],
			message: 'At least one of unit, property, or client must be selected.',
		});
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			path: ['unitId'],
			message: 'At least one of unit, property, or client must be selected.',
		});
	}
});

const ExpenseModelBase: IEntity<'expenses'> = {
	name: 'expenses',
	singular: 'expense',
	singularCap: 'Expense',
	plural: 'expenses',
	pluralCap: 'Expenses',
	defaultForm: () => ({
		amount: 0,
		category: '',
		postAt: new Date(),
		memo: '',
		clientId: null,
		propertyId: null,
		unitId: null,
	}),
};

export const ExpenseModel = {
	...ExpenseModelBase,
	schema: withAttribution,
	basicFields: ['amount', 'postAt', 'memo', 'category'] as const,
};
