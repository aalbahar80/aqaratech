import type { LayoutLoad } from './$types';

import { createApi } from '$api';

export const load: LayoutLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const expenseCategories = await api.expenseCategories.findAll({
		organizationId: params.organizationId,
	});

	const expenseCategory = expenseCategories.find(
		(c) => c.id === params.expenseCategoryId,
	);

	if (!expenseCategory) {
		throw new Error('Expense category not found');
	}

	return { expenseCategory };
};
