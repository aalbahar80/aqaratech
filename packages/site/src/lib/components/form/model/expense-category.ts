import {
	expenseCategoryCreateSchema,
	expenseCategoryUpdateSchema,
} from '@self/utils';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';

export const expenseCategoryFormModel = () =>
	createFormModel({
		entity: 'expenseCategory',

		createSchema: expenseCategoryCreateSchema,
		updateSchema: expenseCategoryUpdateSchema,
		excludedFields: ['parentId'],
		fields: {
			labelEn: createFormField('labelEn', {
				required: true,
			}),

			labelAr: createFormField('labelAr'),

			isGroup: createFormField('isGroup', {
				type: 'checkbox',
				description:
					'You can either create an expense group OR an expense category. \n\n Expense Group: Can contain multiple expense categories. Example: "Utilities" expense group can have two expense categories called "Water" and "Electricity". Groups can be deeply nested. \n\n Expense Category: Holds expense entries.',
				hideWhenEdit: true,
			}),
		},
	});
