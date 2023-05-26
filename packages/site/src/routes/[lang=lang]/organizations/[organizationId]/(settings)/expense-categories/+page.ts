import { browser } from '$app/environment';
import type { PageLoad } from './$types';

import { createApi } from '$api';
import { categoriesRaw } from '$lib/stores/expense-categories';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const categories = await api.expenseCategories.findAll({
		organizationId: params.organizationId,
	});

	if (browser) {
		categoriesRaw.set(categories);
	}

	return { categories };
};
