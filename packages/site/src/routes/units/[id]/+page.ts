import { getDashboardData } from '$lib/components/charts/get-dashboard-data';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	parent,
}) => {
	const unitId = params.id;
	// TODO handle pagination defaults
	const sParams = parseParams(searchParams);

	const parentStuff = await parent();

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
		parentStuff.api.units.findOne({ id: unitId }),
		parentStuff.api.units.findLeases({ id: unitId, ...sParams }),
		...getDashboardData({ api: parentStuff.api, searchParams, unitId }),
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
