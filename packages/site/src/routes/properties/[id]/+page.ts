import { createApi } from '$api';
import { TAKE_MAX } from '$lib/constants/pagination-keys';
import { parseParams } from '$lib/utils/parse-params';
import { startOfMonthN } from '@self/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
	parent,
}) => {
	const propertyId = params.id;
	// TODO handle pagination defaults
	const sParams = parseParams(searchParams);

	const api = createApi(fetch);

	const organizationId = (await parent()).user?.role?.organizationId;

	const [property, units, occupancy, futureOccupancy] = await Promise.all([
		api.properties.findOne({ id: propertyId }),

		api.properties.findUnits({
			id: propertyId,
			...sParams,
			take: TAKE_MAX,
		}),

		api.portfolios.getOccupancy({
			organizationId,
			portfolioId: propertyId,
			start: startOfMonthN(12).split('T')[0],
			end: new Date().toISOString().split('T')[0],
		}),

		api.portfolios.getOccupancy({
			organizationId,
			portfolioId: propertyId,
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
