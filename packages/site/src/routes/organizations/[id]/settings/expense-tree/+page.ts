import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const api = createApi(fetch);

	const categories = await api.expenseCategories.findAll();

	return { categories };
};
