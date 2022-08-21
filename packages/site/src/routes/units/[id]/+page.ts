import {
	defaultRange,
	defaultRangeEnd,
	rangeStart,
} from '$lib/components/charts/utils/date-range';
import { parseParams } from '$lib/utils/parse-params';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({
	params,
	url: { searchParams },
	parent,
}) => {
	const unitId = params.id;
	// TODO handle pagination defaults
	const sParams = parseParams(searchParams);
	const filter = {
		...sParams,
		unitId,
		start: searchParams.get('start') || undefined,
		end: searchParams.get('end') || undefined,
		take: 1000,
	};

	if (!filter.start && !filter.end) {
		filter.start = rangeStart(defaultRange);
		filter.end = defaultRangeEnd();
	}

	const parentStuff = await parent();
	const [
		unit,
		leases,
		invoicesGrouped,
		expensesGrouped,
		invoices,
		expenses,
		invoicesGroupedPaid,
		invoicesGroupedUnpaid,
		categories,
	] = await Promise.all([
		parentStuff.api.units.findOne({ id: unitId }),
		parentStuff.api.units.findLeases({ id: unitId, ...sParams }),

		parentStuff.api.aggregate.getIncomeByMonth(filter),
		parentStuff.api.aggregate.getExpensesByMonth(filter),
		parentStuff.api.leaseInvoices.findAll(filter),
		parentStuff.api.expenses.findAll(filter), // TODO filter serverside

		parentStuff.api.aggregate.getIncomeByMonth({
			...filter,
			paidStatus: 'paid',
		}),
		parentStuff.api.aggregate.getIncomeByMonth({
			...filter,
			paidStatus: 'unpaid',
		}),
		parentStuff.api.expenseCategories.findAll(),
	]);

	return {
		unit,
		leases,
		invoicesGrouped,
		expensesGrouped,
		invoices,
		expenses,
		invoicesGroupedPaid,
		invoicesGroupedUnpaid,
		categories,
	};
};
