import { createApi } from '$api';
import { startOfMonthN } from '@self/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, parent }) => {
	const unitId = params.id;

	const api = createApi(fetch);

	const role = (await parent()).user!.role!;

	const { organizationId, portfolioId } = role;

	const [unit, leases, occupancy, futureOccupancy] = await Promise.all([
		api.units.findOne({ id: unitId }),

		api.units.findLeases({ id: unitId, take: 100 }),

		api.portfolios.getOccupancy({
			organizationId,
			portfolioId,
			unitId,
			start: startOfMonthN(12).split('T')[0],
			end: new Date().toISOString().split('T')[0],
		}),

		api.portfolios.getOccupancy({
			organizationId,
			portfolioId,
			unitId,
			start: new Date().toISOString().split('T')[0],
			end: startOfMonthN(-12).split('T')[0],
		}),
	]);

	return {
		unit,
		leases,
		occupancy,
		futureOccupancy,
	};
};
