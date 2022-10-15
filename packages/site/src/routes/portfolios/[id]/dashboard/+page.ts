import { getDashboardData } from '$lib/components/charts/get-dashboard-data';
import { TAKE_MAX } from '$lib/constants/pagination-keys';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	parent,
}) => {
	const portfolioId = params.id;

	const parentStuff = await parent();

	const [
		properties,
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
		parentStuff.api!.portfolios.findProperties({
			id: portfolioId,
			take: TAKE_MAX,
		}),
		parentStuff.api!.portfolios.findUnits({ id: portfolioId, take: TAKE_MAX }),
		...getDashboardData({
			api: parentStuff.api,
			searchParams,
			portfolioId,
		}),
	]);

	return {
		properties,
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
