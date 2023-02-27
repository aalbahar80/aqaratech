import { get } from 'svelte/store';
import { expenseCreateSchema, expenseUpdateSchema } from '@self/utils';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';
import { categories } from '$lib/stores/expense-categories';
import { toOptions } from '$lib/utils/expense-type-options';

export const expenseFormModel = () =>
	createFormModel({
		entity: 'expense',

		createSchema: expenseCreateSchema,
		updateSchema: expenseUpdateSchema,
		excludedFields: ['label'],
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
				options: toOptions(get(categories)),
			}),

			memo: createFormField('memo'),
		},
	});
