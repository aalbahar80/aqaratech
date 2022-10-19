import { createApi } from '$api';
import { getDashboardData } from '$lib/components/charts/get-dashboard-data';
import { TAKE_MAX } from '$lib/constants/pagination-keys';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
}) => {
	const propertyId = params.id;
	// TODO handle pagination defaults
	const sParams = parseParams(searchParams);

	const api = createApi(fetch);

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
		api.properties.findOne({ id: propertyId }),
		api.properties.findUnits({
			id: propertyId,
			...sParams,
			take: TAKE_MAX,
		}),
		...getDashboardData({
			api: api,
			searchParams,
			propertyId,
		}),
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
