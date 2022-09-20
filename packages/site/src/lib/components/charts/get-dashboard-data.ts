import type { Api } from '$api';
import {
	clampedDate,
	defaultRange,
	defaultRangeEnd,
	getOneYearAgo,
	getOneYearLater,
	rangeStart,
} from '$lib/components/charts/utils/date-range';
import { parseParams } from '$lib/utils/parse-params';

export const getDashboardData = async ({
	api,
	searchParams,
	portfolioId,
	propertyId,
	unitId,
}: {
	api: Api;
	searchParams: URLSearchParams;
	portfolioId?: string;
	propertyId?: string;
	unitId?: string;
}) => {
	const sParams = parseParams(searchParams);

	// TODO handle pagination defaults
	const filter = {
		...sParams,
		portfolioId,
		propertyId: propertyId || searchParams.get('propertyId') || undefined,
		unitId: unitId || searchParams.get('unitId') || undefined,
		start: searchParams.get('start') || undefined,
		end: searchParams.get('end') || undefined,
		take: 1000,
	};

	if (!filter.start && !filter.end) {
		filter.start = rangeStart(defaultRange);
		filter.end = defaultRangeEnd();
	}

	const requests = [
		api.aggregate.getIncomeByMonth(filter),
		api.aggregate.getExpensesByMonth(filter),

		// Alternative: use stores to avoid refetching everything while paginating
		api.leaseInvoices.findAll(filter),
		api.expenses.findAll(filter), // TODO filter serverside

		api.aggregate.getIncomeByMonth({
			...filter,
			paidStatus: 'paid',
		}),
		api.aggregate.getIncomeByMonth({
			...filter,
			paidStatus: 'unpaid',
		}),
		api.aggregate.getOccupancy({
			...filter,
			// Always get the last year's occupancy (atleast)
			start: clampedDate(
				filter.start || rangeStart(defaultRange),
				filter.start || rangeStart(defaultRange),
				getOneYearAgo().toISOString(),
			),
		}),
		// future occupancy
		api.aggregate.getOccupancy({
			...filter,
			start: new Date().toISOString().split('T')[0], // including time will cause the query to be refetech on the client because the url will be slightly different
			end: getOneYearLater().toISOString(),
		}),
		api.expenseCategories.findAll(),
	] as const;

	return requests;
};
