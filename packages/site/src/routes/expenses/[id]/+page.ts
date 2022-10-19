import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ fetch, params }) => {
	const expenseId = params.id;

	const expense = createApi(fetch).expenses.findOne({ id: expenseId });

	return { expense };
};
