import { createApi } from '$api';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch, parent }) => {
	const api = createApi(fetch);

	const organizationId = (await parent()).user?.role?.organizationId;

	const [expense, expenseTypes] = await Promise.all([
		api.expenses.findOne({ id: params.id }),
		api.expenseCategories.findAll({ organizationId }),
	]);

	return { expense, expenseTypes };
};
