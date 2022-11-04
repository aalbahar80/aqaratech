import { createApi } from '$api';
import { occupancyRange } from '$lib/components/charts/utils/occupancy-range';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	fetch,
}) => {
	const api = createApi(fetch);

	const { organizationId, portfolioId } = params;

	const [properties, occupancy, futureOccupancy] = await Promise.all([
		api.properties.findAll({
			...parseParams(searchParams),
		}),

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

	return { properties, occupancy, futureOccupancy };
};
