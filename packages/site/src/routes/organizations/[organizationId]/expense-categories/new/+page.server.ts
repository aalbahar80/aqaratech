import { handleForm } from '$lib/components/form/handle-form';
import { expenseCategoryCreateSchema, getRoute, PageTab } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'expenseCategory',
			schema: expenseCategoryCreateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.expenseCategories.create({
					organizationId: event.params.organizationId,
					createExpenseCategoryDto: data,
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
