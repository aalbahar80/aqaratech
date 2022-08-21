import {
	defaultRange,
	defaultRangeEnd,
	rangeStart,
} from '$lib/components/charts/utils/date-range';
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

	if (!filter.start && !filter.end) {
		filter.start = rangeStart(defaultRange);
		filter.end = defaultRangeEnd();
	}
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
		categories,
	] = await Promise.all([
		parentStuff.api!.portfolios.findProperties({ id: portfolioId }),
		parentStuff.api!.portfolios.findUnits({ id: portfolioId }),

		parentStuff.api!.aggregate.getIncomeByMonth(filter),
		parentStuff.api!.aggregate.getExpensesByMonth(filter),
		parentStuff.api!.leaseInvoices.findAll(filter),
		parentStuff.api!.expenses.findAll(filter), // TODO filter serverside

		parentStuff.api!.aggregate.getIncomeByMonth({
			...filter,
			paidStatus: 'paid',
		}),
		parentStuff.api!.aggregate.getIncomeByMonth({
			...filter,
			paidStatus: 'unpaid',
		}),
		parentStuff.api!.expenseCategories.findAll(),
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
		categories,
	};
};
