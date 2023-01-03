import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const { organizationId, expenseId } = params;

	const [expense, categories] = await Promise.all([
		api.expenses.findOne({ id: expenseId }),
		api.expenseCategories.findAll({ organizationId }),
	]);

	return { expense, categories };
};
