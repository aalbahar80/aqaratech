import type { Api } from '$lib/client/api';
import {
	clampedDate,
	defaultRange,
	defaultRangeEnd,
	getOneYearAgo,
	getOneYearLater,
	rangeStart,
} from '$lib/components/charts/utils/date-range';
import {
	EXPENSE_PAGINATION_KEY,
	LEASE_INVOICE_PAGINATION_KEY,
} from '$lib/constants/pagination-keys';
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
		take: 20,
	};

	if (!filter.start && !filter.end) {
		filter.start = rangeStart(defaultRange);
		filter.end = defaultRangeEnd();
	}

	const requests = [
		api.aggregate.getIncomeByMonth(filter),
		api.aggregate.getExpensesByMonth(filter),
		api.leaseInvoices.findAll({
			...filter,
			page: +(searchParams.get(LEASE_INVOICE_PAGINATION_KEY) || 1),
		}),
		api.expenses.findAll({
			...filter,
			page: +(searchParams.get(EXPENSE_PAGINATION_KEY) || 1),
		}), // TODO filter serverside

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
			start: new Date().toISOString(),
			end: getOneYearLater().toISOString(),
		}),
		api.expenseCategories.findAll(),
	] as const;

	return requests;
};
