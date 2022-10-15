import { getDashboardData } from '$lib/components/charts/get-dashboard-data';
import { TAKE_MAX } from '$lib/constants/pagination-keys';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	parent,
}) => {
	const propertyId = params.id;
	// TODO handle pagination defaults
	const sParams = parseParams(searchParams);

	const parentStuff = await parent();

	const [
		property,
		units,
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
		parentStuff.api!.properties.findOne({ id: propertyId }),
		parentStuff.api!.properties.findUnits({
			id: propertyId,
			...sParams,
			take: TAKE_MAX,
		}),
		...(await getDashboardData({
			api: parentStuff.api,
			searchParams,
			propertyId,
		})),
	]);

	return {
		property,
		units,
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
