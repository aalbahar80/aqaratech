import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ fetch, params }) => {
	const expense = createApi(fetch).expenses.findOne({ id: params.expenseId });

	return { expense };
};
