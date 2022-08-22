import { getDashboardData } from '$lib/components/charts/get-dashboard-data';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	parent,
}) => {
	const sParams = parseParams(searchParams);
	const propertyId = params.id;

	// TODO handle pagination defaults
	const filter = {
		...sParams,
		propertyId,
		unitId: searchParams.get('unitId') || undefined,
		start: searchParams.get('start') || undefined,
		end: searchParams.get('end') || undefined,
		take: 1000,
	};

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
		categories,
	] = await Promise.all([
		parentStuff.api!.properties.findOne({ id: propertyId }),
		parentStuff.api!.properties.findUnits({ id: propertyId, ...sParams }),
		...(await getDashboardData(parentStuff.api, filter)),
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
		categories,
	};
};
