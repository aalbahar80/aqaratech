import { createApi } from '$api';
import { occupancyRange } from '$lib/components/charts/utils/occupancy-range';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const api = createApi(fetch);

	const { organizationId, portfolioId } = params;

	const [occupancy, futureOccupancy] = await Promise.all([
		api.portfolios.getOccupancy({
			organizationId,
			portfolioId,
			...occupancyRange.previous,
		}),

		api.portfolios.getOccupancy({
			organizationId,
			portfolioId,
			...occupancyRange.future,
		}),
	]);

	return { occupancy, futureOccupancy };
};
