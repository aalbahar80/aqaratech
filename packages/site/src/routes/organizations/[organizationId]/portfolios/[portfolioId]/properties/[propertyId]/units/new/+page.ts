import { createApi } from '$api';
import type { PredefinedUnit } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);
	const predefined: PredefinedUnit = {
		portfolioId: searchParams.get('portfolioId'),
		propertyId: searchParams.get('propertyId'),
	};

	const [portfolios, properties] = await Promise.all([
		api.portfolios.findAll({ take: 1000 }),

		predefined.portfolioId
			? api.portfolios.findProperties({
					id: predefined.portfolioId,
					take: 1000,
			  })
			: undefined,
	]);

	return { portfolios, properties, predefined };
};
