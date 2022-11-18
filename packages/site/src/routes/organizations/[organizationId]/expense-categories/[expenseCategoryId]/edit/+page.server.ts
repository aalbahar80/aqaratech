import { handleForm } from '$lib/components/form/handle-form';
import { expenseCategoryUpdateSchema, getRoute, PageTab } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
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
			redirectTo: getRoute({
				entity: 'organization',
				id: event.params.organizationId,
				pageType: PageTab.ExpenseCategories,
				params: {},
			}),
		});
	},
};
