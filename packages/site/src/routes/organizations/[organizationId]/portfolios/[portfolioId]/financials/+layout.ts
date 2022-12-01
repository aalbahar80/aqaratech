import { createApi } from '$api';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const portfolioId = params.portfolioId;

	const api = createApi(fetch);

	const [portfolio, properties, units] = await Promise.all([
		api.portfolios.findOne({
			id: portfolioId,
		}),

		api.portfolios.findProperties({
			id: portfolioId,
			take: 100,
		}),

		api.portfolios.findUnits({
			id: portfolioId,
			take: 100,
		}),
	]);

	return {
		portfolio,
		properties,
		units,
	};
};
