import type { LayoutLoad } from './$types';

import { createApi } from '$api';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const expense = await api.expenses.findOne({ id: params.expenseId });

	return { expense };
};
