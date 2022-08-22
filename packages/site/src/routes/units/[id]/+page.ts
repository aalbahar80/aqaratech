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
	const filter = {
		...sParams,
		unitId,
		start: searchParams.get('start') || undefined,
		end: searchParams.get('end') || undefined,
		take: 1000,
	};

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
		categories,
	] = await Promise.all([
		parentStuff.api.units.findOne({ id: unitId }),
		parentStuff.api.units.findLeases({ id: unitId, ...sParams }),
		...(await getDashboardData(parentStuff.api, filter)),
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
		categories,
	};
};
