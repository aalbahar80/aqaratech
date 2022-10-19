import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const [expense, expenseTypes] = await Promise.all([
		api.expenses.findOne({ id: params.id }),
		api.expenseCategories.findAll(),
	]);

	return { expense, expenseTypes };
};
