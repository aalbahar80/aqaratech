import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const expense = await api.expenses.findOne({ id: params.expenseId });

	return { expense };
};
