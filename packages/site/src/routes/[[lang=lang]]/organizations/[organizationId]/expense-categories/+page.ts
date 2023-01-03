import type { PageLoad } from './$types';

import { createApi } from '$api';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const categories = await api.expenseCategories.findAll({
		organizationId: params.organizationId,
	});

	return { categories };
};
