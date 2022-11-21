import { createApi } from '$api';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const portfolioId = params.portfolioId;

	const api = createApi(fetch);

	const properties = await api.portfolios.findProperties({
		id: portfolioId,
	});

	return {
		properties,
	};
};
