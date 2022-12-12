import { expenseCategoryCreateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'expenseCategory',
			schema: expenseCategoryCreateSchema,
			checkboxKeys: {
				isGroup: true,
			},
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
