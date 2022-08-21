import type { PredefinedUnit } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const propertyId = searchParams.get('propertyId');

	const parentStuff = await parent();
	const [portfolios, properties] = await Promise.all([
		parentStuff.api.portfolios.findAll({ take: 1000 }),
		parentStuff.api.properties.findAll({ take: 1000 }),
	]);

	const predefined: PredefinedUnit = {
		portfolioId: properties.results.find(
			(property) => property.id === propertyId,
		)?.portfolioId,
		propertyId: searchParams.get('propertyId'),
	};

	return { portfolios, properties, predefined };
};
