import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();

	const categories = await parentStuff.api.expenseCategories.findAll();

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
