import type { PredefinedUnit } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const predefined: PredefinedUnit = {
		portfolioId: searchParams.get('portfolioId'),
		propertyId: searchParams.get('propertyId'),
	};

	const parentStuff = await parent();
	const [portfolios, properties] = await Promise.all([
		parentStuff.api.portfolios.findAll({ take: 1000 }),

		predefined.portfolioId
			? parentStuff.api.portfolios.findProperties({
					id: predefined.portfolioId,
					take: 1000,
			  })
			: undefined,
	]);

	return { portfolios, properties, predefined };
};
