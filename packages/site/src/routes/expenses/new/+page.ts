import type { PredefinedExpense } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const predefined: PredefinedExpense = {
		portfolioId: searchParams.get('portfolioId'),
		propertyId: searchParams.get('propertyId'),
		unitId: searchParams.get('unitId'),
	};

	const parentStuff = await parent();
	const [portfolios, properties, units, expenseTypes] = await Promise.all([
		parentStuff.api.portfolios.findAll({ take: 1000 }),
		parentStuff.api.properties.findAll({ take: 1000 }),
		parentStuff.api.units.findAll({ take: 1000 }),
		parentStuff.api.expenseCategories.findAll(),
	]);

	return { portfolios, properties, units, predefined, expenseTypes };
};
