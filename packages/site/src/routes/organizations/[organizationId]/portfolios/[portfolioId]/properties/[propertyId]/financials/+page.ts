import { createApi } from '$api';
import { calculateNet } from '$lib/components/dashboard/stats/calculate-net';
import { rangeStart } from '$lib/components/dashboard/stats/range-start';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const { organizationId, portfolioId, propertyId } = params;

	const [income, expenses] = await Promise.all([
		api.portfolios.getIncomeByMonth({
			organizationId,
			portfolioId,
			propertyId,
			start: rangeStart,
		}),

		api.portfolios.getExpensesByMonth({
			organizationId,
			portfolioId,
			propertyId,
			start: rangeStart,
		}),
	]);

	return {
		net: calculateNet(income.paid, expenses),
		income,
		expenses,
	};
};
