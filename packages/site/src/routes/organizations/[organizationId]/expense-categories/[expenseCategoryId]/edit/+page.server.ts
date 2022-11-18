import { handleForm } from '$lib/components/form/handle-form';
import { expenseCategoryUpdateSchema } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'expenseCategory',
			schema: expenseCategoryUpdateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.expenseCategories.update({
					id: event.params.expenseCategoryId,
					updateExpenseCategoryDto: data,
				});

				return submitted.id;
			},
		});
	},
};
