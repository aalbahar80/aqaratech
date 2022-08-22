import type { Api } from '$lib/client/api';
import {
	clampedDate,
	defaultRange,
	defaultRangeEnd,
	getOneYearAgo,
	rangeStart,
} from '$lib/components/charts/utils/date-range';
import type { AggregateApiGetOccupancyRequest } from '@self/sdk';

export const getDashboardData = async (
	api: Api,
	filter: AggregateApiGetOccupancyRequest,
) => {
	if (!filter.start && !filter.end) {
		filter.start = rangeStart(defaultRange);
		filter.end = defaultRangeEnd();
	}

	const requests = [
		api.aggregate.getIncomeByMonth(filter),
		api.aggregate.getExpensesByMonth(filter),
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
		api.expenseCategories.findAll(),
	] as const;

	return requests;
};
