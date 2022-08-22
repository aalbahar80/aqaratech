import { getDashboardData } from '$lib/components/charts/get-dashboard-data';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	parent,
}) => {
	const portfolioId = params.id;
	const filter = {
		portfolioId,
		propertyId: searchParams.get('propertyId') || undefined,
		unitId: searchParams.get('unitId') || undefined,
		start: searchParams.get('start') || undefined,
		end: searchParams.get('end') || undefined,
		take: 1000,
	};

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
		categories,
	] = await Promise.all([
		parentStuff.api!.portfolios.findProperties({ id: portfolioId }),
		parentStuff.api!.portfolios.findUnits({ id: portfolioId }),
		...(await getDashboardData(parentStuff.api, filter)),
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
		categories,
	};
};
