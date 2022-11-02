import { createApi } from '$api';
import { getDashboardData } from '$lib/components/charts/get-dashboard-data';
import { TAKE_MAX } from '$lib/constants/pagination-keys';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	fetch,
	params,
	url: { searchParams },
}) => {
	const { organizationId, portfolioId } = params;

	const api = createApi(fetch);

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
		api.portfolios.findProperties({
			id: portfolioId,
			take: TAKE_MAX,
		}),
		api.portfolios.findUnits({ id: portfolioId, take: TAKE_MAX }),
		...getDashboardData({
			api: api,
			searchParams,
			portfolioId,
			organizationId,
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
