import { createApi } from '$api';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const portfolioId = params.portfolioId;

	const api = createApi(fetch);

	const properties = await api.portfolios.findProperties({
		id: portfolioId,
		take: 100,
	});

	const units = await api.portfolios.findUnits({
		id: portfolioId,
		take: 100,
	});

	return {
		properties,
		units,
	};
};
