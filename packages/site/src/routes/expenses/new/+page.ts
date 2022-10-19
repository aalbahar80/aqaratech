import { createApi } from '$api';
import type { PredefinedExpense } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);

	const predefined: PredefinedExpense = {
		portfolioId: searchParams.get('portfolioId'),
		propertyId: searchParams.get('propertyId'),
		unitId: searchParams.get('unitId'),
	};

	const [portfolios, properties, units, expenseTypes] = await Promise.all([
		api.portfolios.findAll({ take: 1000 }),

		predefined.portfolioId
			? api.portfolios.findProperties({
					id: predefined.portfolioId,
					take: 1000,
			  })
			: undefined,

		predefined.propertyId
			? api.properties.findUnits({
					id: predefined.propertyId,
					take: 1000,
			  })
			: undefined,

		api.expenseCategories.findAll(),
	]);

	return { portfolios, properties, units, predefined, expenseTypes };
};
