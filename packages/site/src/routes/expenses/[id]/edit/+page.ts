import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();

	const [expense, expenseTypes] = await Promise.all([
		parentStuff.api.expenses.findOne({ id: params.id }),
		parentStuff.api.expenseCategories.findAll(),
	]);

	return { expense, expenseTypes };
};
