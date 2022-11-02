import { createApi } from '$api';
import type { PredefinedProperty } from '$lib/models/interfaces/predefined.interface';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url: { searchParams }, fetch }) => {
	const api = createApi(fetch);
	const predefined: PredefinedProperty = {
		portfolioId: searchParams.get('portfolioId'),
	};

	const portfolios = await api.portfolios.findAll({
		take: 1000,
	});

	return { portfolios, predefined };
};
