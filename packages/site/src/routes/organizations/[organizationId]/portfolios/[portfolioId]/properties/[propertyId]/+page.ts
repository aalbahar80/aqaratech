import { createApi } from '$api';
import { startOfMonthN } from '@self/utils';
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
			start: startOfMonthN(12).split('T')[0],
			end: new Date().toISOString().split('T')[0],
		}),

		api.portfolios.getOccupancy({
			organizationId,
			portfolioId,
			propertyId,
			start: new Date().toISOString().split('T')[0],
			end: startOfMonthN(-12).split('T')[0],
		}),
	]);

	return {
		property,
		units,
		occupancy,
		futureOccupancy,
	};
};
