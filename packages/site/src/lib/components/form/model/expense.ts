import { createFormField } from '$lib/components/form/model/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/model/form-model';
import { expenseCreateSchema, expenseUpdateSchema } from '@self/utils';

export const expenseFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'expense',
		pageType,
		createSchema: expenseCreateSchema,
		updateSchema: expenseUpdateSchema,
		fields: {
			postAt: createFormField('postAt', {
				type: 'date',
			}),

			amount: createFormField('amount', {
				type: 'number',
			}),

			categoryId: createFormField('categoryId', {
				type: 'select',
				combobox: true,
				options: [],
			}),

			memo: createFormField('memo'),

			label: createFormField('label'),
		},
	});
