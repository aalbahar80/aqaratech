import { expenseUpdateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'expense',
			schema: expenseUpdateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.expenses.update({
					id: event.params.expenseId,
					updateExpenseDto: data,
				});

				return submitted.id;
			},
		});
	},
};
