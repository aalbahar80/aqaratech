import { fancy } from '$lib/client/ho-load';
import { getDashboardData } from '$lib/components/charts/get-dashboard-data';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = fancy(
	async ({ api, params, url: { searchParams } }) => {
		const unitId = params.id;
		// TODO handle pagination defaults
		const sParams = parseParams(searchParams);
		const [
			unit,
			leases,
			invoicesGrouped,
			expensesGrouped,
			invoices,
			expenses,
			invoicesGroupedPaid,
			invoicesGroupedUnpaid,
			occupancy,
			futureOccupancy,
			categories,
		] = await Promise.all([
			api.units.findOne({ id: unitId }),
			api.units.findLeases({ id: unitId, ...sParams }),
			...(await getDashboardData({
				api: api,
				searchParams,
				unitId,
			})),
		]);
		return {
			unit,
			leases,
			invoicesGrouped,
			expensesGrouped,
			invoices,
			expenses,
			invoicesGroupedPaid,
			invoicesGroupedUnpaid,
			occupancy,
			futureOccupancy,
			categories,
		};
	},
);
