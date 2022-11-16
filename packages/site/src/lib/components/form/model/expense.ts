import { createFormField } from '$lib/components/form/model/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/model/form-model';
import {
	key,
	type ExpenseCategoryContext,
} from '$lib/components/organization/expense-category-context';
import { expenseCreateSchema, expenseUpdateSchema } from '@self/utils';
import { getContext } from 'svelte';

export const expenseFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'expense',
		pageType,
		createSchema: expenseCreateSchema,
		updateSchema: expenseUpdateSchema,
		fields: {
			postAt: createFormField('postAt', {
				type: 'date',
				required: true,
			}),

			amount: createFormField('amount', {
				type: 'number',
				required: true,
			}),

			categoryId: createFormField('categoryId', {
				type: 'select',
				combobox: true,
				getOptions: () => {
					const context = getContext<ExpenseCategoryContext>(key);
					return context.data;
				},
			}),

			memo: createFormField('memo'),
		},
	});
