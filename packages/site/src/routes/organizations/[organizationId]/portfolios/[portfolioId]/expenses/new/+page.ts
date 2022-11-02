import { createApi } from '$api';
import type { PredefinedExpense } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	url: { searchParams },
	fetch,
	params,
}) => {
	const api = createApi(fetch);

	const { organizationId, portfolioId } = params;

	const predefined: PredefinedExpense = {
		propertyId: searchParams.get('propertyId'),
		unitId: searchParams.get('unitId'),
	};

	// TODO: allow only one predefined. Fetch it here.

	const [portfolios, properties, units, expenseTypes] = await Promise.all([
		api.portfolios.findAll({ take: 1000 }),

		predefined.portfolioId
			? api.portfolios.findProperties({
					id: portfolioId,
					take: 1000,
			  })
			: undefined,

		predefined.propertyId
			? api.properties.findUnits({
					id: predefined.propertyId,
					take: 1000,
			  })
			: undefined,

		api.expenseCategories.findAll({
			organizationId,
		}),
	]);

	return { portfolios, properties, units, predefined, expenseTypes };
};
