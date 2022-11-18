import { handleForm } from '$lib/components/form/handle-form';
import { expenseCategoryCreateSchema } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'expenseCategory',
			schema: expenseCategoryCreateSchema,
			checkboxKeys: ['isGroup'],
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.expenseCategories.create({
					organizationId: event.params.organizationId,
					createExpenseCategoryDto: data,
				});

				return submitted.id;
			},
		});
	},
};
