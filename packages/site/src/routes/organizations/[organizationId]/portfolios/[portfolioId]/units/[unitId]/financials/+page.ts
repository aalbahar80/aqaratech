import { createApi } from '$api';
import { calculateNet } from '$lib/components/dashboard/stats/calculate-net';
import { rangeStart } from '$lib/components/dashboard/stats/range-start';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const api = createApi(fetch);

	const { organizationId, portfolioId, unitId } = params;

	const [income, expenses] = await Promise.all([
		api.portfolios.getIncomeByMonth({
			organizationId,
			portfolioId,
			unitId,
			start: rangeStart,
		}),

		api.portfolios.getExpensesByMonth({
			organizationId,
			portfolioId,
			unitId,
			start: rangeStart,
		}),
	]);

	return {
		net: calculateNet(income.paid, expenses),
		income,
		expenses,
	};
};
