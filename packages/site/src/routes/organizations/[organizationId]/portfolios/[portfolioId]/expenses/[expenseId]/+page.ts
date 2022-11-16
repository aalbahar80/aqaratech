import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const expense = await api.expenses.findOne({ id: params.expenseId });

	return { expense };
};
