import { createApi } from '$api';
import { getDashboardData } from '$lib/components/charts/get-dashboard-data';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
	parent,
}) => {
	const organizationId = (await parent()).user?.role?.organizationId;

	const unitId = params.id;
	// TODO handle pagination defaults
	const sParams = parseParams(searchParams);

	const api = createApi(fetch);

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
		...getDashboardData({ api: api, searchParams, unitId, organizationId }),
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
};
