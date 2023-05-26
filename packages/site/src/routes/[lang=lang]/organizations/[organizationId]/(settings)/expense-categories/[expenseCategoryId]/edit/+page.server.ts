import type { Actions } from './$types';
import { expenseCategoryUpdateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'expenseCategory',
			schema: expenseCategoryUpdateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.expenseCategories.update({
					organizationId: event.params.organizationId,
					id: event.params.expenseCategoryId,
					updateExpenseCategoryDto: data,
				});

				return submitted.id;
			},
		});
	},
};
