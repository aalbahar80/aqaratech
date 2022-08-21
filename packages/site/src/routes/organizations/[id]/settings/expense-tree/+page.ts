import type { PageLoad } from './$types';
export const load: PageLoad = async ({ parent }) => {
	const parentStuff = await parent();

	const categories = await parentStuff.api.expenseCategories.findAll();

	return { categories };
};
