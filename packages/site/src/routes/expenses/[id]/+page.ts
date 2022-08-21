import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const parentStuff = await parent();
	const expenseId = params.id;

	const [expense] = await Promise.all([
		parentStuff.api.expenses.findOne({ id: expenseId }),
	]);
	return { expense };
};
