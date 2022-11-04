import { createApi } from '$api';
import { occupancyRange } from '$lib/components/charts/utils/occupancy-range';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const { organizationId, portfolioId, propertyId } = params;

	const api = createApi(fetch);

	const [property, units, occupancy, futureOccupancy] = await Promise.all([
		api.properties.findOne({ id: propertyId }),

		api.properties.findUnits({
			id: propertyId,
			take: 100,
		}),

		api.portfolios.getOccupancy({
			organizationId,
			portfolioId,
			propertyId,
			...occupancyRange.previous,
		}),

		api.portfolios.getOccupancy({
			organizationId,
			portfolioId,
			propertyId,
			...occupancyRange.future,
		}),
	]);

	return {
		property,
		units,
		occupancy,
		futureOccupancy,
	};
};
