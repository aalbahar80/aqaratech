import { getDashboardData } from '$lib/components/charts/get-dashboard-data';
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
		parentStuff.api!.portfolios.findProperties({ id: portfolioId }),
		parentStuff.api!.portfolios.findUnits({ id: portfolioId }),
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
