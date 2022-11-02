import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const categories = await api.expenseCategories.findAll({
		organizationId: params.organizationId,
	});

	const expenseCategory = categories.find(
		(category) => category.id === params.expenseCategoryId,
	);

	if (!expenseCategory) {
		throw new Error('Expense category not found');
		// return {
		// 	status: 404,
		// 	error: new Error('Expense category not found'),
		// };
	}

	return { expenseCategory };
};
