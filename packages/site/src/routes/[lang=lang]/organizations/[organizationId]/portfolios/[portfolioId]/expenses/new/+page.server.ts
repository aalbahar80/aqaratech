import type { Actions } from './$types';
import { expenseCreateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'expense',
			schema: expenseCreateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.createExpense({
					organizationId: event.params.organizationId,
					createExpenseDto: data,
				});

				return submitted.id;
			},

			fromParams: ['portfolioId'],
			fromQuery: ['propertyId', 'unitId'],
		});
	},
};
