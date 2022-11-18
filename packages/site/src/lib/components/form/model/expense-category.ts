import { createFormField } from '$lib/components/form/model/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/model/form-model';
import {
	expenseCategoryCreateSchema,
	expenseCategoryUpdateSchema,
} from '@self/utils';

export const expenseCategoryFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'expenseCategory',
		pageType,
		createSchema: expenseCategoryCreateSchema,
		updateSchema: expenseCategoryUpdateSchema,
		fields: {
			labelEn: createFormField('labelEn', {
				required: true,
			}),

			labelAr: createFormField('labelAr'),

			// description: createFormField('description'),

			isGroup: createFormField('isGroup', {
				type: 'checkbox',
				hint: 'You can either create an expense group OR an expense category. \n\n Expense Group: Can contain multiple expense categories. Example: "Utilities" expense group can have two expense categories called "Water" and "Electricity". Groups can be deeply nested. \n\n Expense Category: Holds expense entries.',
				hideWhenEdit: true,
			}),
		},
	});
