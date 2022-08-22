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

		predefined.portfolioId
			? parentStuff.api.portfolios.findProperties({
					id: predefined.portfolioId,
					take: 1000,
			  })
			: undefined,

		predefined.propertyId
			? parentStuff.api.properties.findUnits({
					id: predefined.propertyId,
					take: 1000,
			  })
			: undefined,

		parentStuff.api.expenseCategories.findAll(),
	]);

	return { portfolios, properties, units, predefined, expenseTypes };
};
