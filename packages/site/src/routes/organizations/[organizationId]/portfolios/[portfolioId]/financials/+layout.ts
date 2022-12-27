import type { LayoutLoad } from './$types';

import { createApi } from '$api';
import { MAX_PROPERTIES, MAX_UNITS } from '$lib/constants/misc';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const portfolioId = params.portfolioId;

	const api = createApi(fetch);

	const [portfolio, properties, units] = await Promise.all([
		api.portfolios.findOne({
			id: portfolioId,
		}),

		api.portfolios.findProperties({
			id: portfolioId,
			take: MAX_PROPERTIES,
		}),

		api.portfolios.findUnitsMinimal({
			id: portfolioId,
			take: MAX_UNITS,
		}),
	]);

	return {
		portfolio,
		properties,
		units,
	};
};
