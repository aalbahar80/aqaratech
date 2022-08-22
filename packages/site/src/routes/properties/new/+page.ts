import type { PredefinedProperty } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, parent }) => {
	const predefined: PredefinedProperty = {
		portfolioId: searchParams.get('portfolioId'),
	};

	const parentStuff = await parent();
	const portfolios = await parentStuff.api.portfolios.findAll({
		take: 1000,
	});

	return { portfolios, predefined };
};
