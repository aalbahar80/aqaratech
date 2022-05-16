import type { InferQueryOutput } from '$lib/client/trpc';
import type { ChartData, DataSet } from '$lib/components/dashboard/charts/net';
import { getColor } from '$lib/config/constants';
import { CTable } from '$lib/models/classes/table.class';
import { kwdFormat, startCase } from '$lib/utils/common';
import type Chart from 'chart.js/dist/chart.esm';
import {
	addMonths,
	closestTo,
	format,
	startOfMonth,
	subMonths,
} from 'date-fns';
import * as R from 'remeda';
import { derived, type Writable } from 'svelte/store';

type Income = InferQueryOutput<'owner:charts:income'>;
type Expense = InferQueryOutput<'owner:charts:expenses'>;

const getClosestStartOfMonth = (date: Date) => {
	const prevMonth = subMonths(date, 1);
	const startOfPrevMonth = startOfMonth(prevMonth);
	const nextMonth = addMonths(date, 1);
	const startOfNextMonth = startOfMonth(nextMonth);
	const startOfThisMonth = startOfMonth(date);
	const potentials = [startOfPrevMonth, startOfNextMonth, startOfThisMonth];
	const closest = closestTo(date, potentials);
	return closest;
};

type DataA = {
	income: ChartData[];
	expenses: ChartData[];
};
const getDatasets = (
	data: DataA,
): Chart<'line', ChartData[]>['data']['datasets'] => {
	const groups = ['income', 'expenses'] as const;
	const datasets: DataSet[] = groups.map((group, n) => {
		const backgroundColor = getColor(n, groups.length);
		return {
			label: startCase(group),
			borderColor: backgroundColor,
			data: data[group],
			parsing: {
				yAxisKey: 'total',
				xAxisKey: 'date',
			},
			backgroundColor,
			borderRadius: 10,
		};
	});
	return datasets;
};

const aggregate = <T extends { id: string; amount: number; postAt: Date }>(
	data: T[],
) => {
	const a = data.map((e) => R.pick(e, ['id', 'amount', 'postAt']));
	const b = R.groupBy(a, (e) => format(e.postAt, 'yyyy-MM'));
	const c = R.mapValues(b, (v) => R.reduce(v, (acc, e) => acc + e.amount, 0));
	const d = Object.entries(c).map(([k, v]) => ({
		date: new Date(k),
		total: v,
	}));
	return d;
};

export const getNetChartStore = (
	income: Writable<Income>,
	expenses: Writable<Expense>,
) =>
	// TODO: derived updates when both income and expenses are updated
	// TODO: instead, derive everything from filters?
	derived([income, expenses], ([$income, $expenses]) => {
		const revenue = R.filter($income, (e) => e.isPaid);
		const aggRevenue = aggregate(revenue);
		const aggExpenses = aggregate($expenses);
		const datasets = getDatasets({
			income: aggRevenue,
			expenses: aggExpenses,
		});
		return datasets;
	});

export const getNetTableStore = (
	income: Writable<Income>,
	expenses: Writable<Expense>,
) =>
	// TODO: derived updates when both income and expenses are updated
	// TODO: instead, derive everything from filters?
	derived([income, expenses], ([$income, $expenses]) => {
		const revenue = R.filter($income, (e) => e.isPaid);
		const aggRevenue = aggregate(revenue);
		const aggExpenses = aggregate($expenses);

		const allDates = R.uniqBy(
			R.concat(
				aggRevenue.map((e) => e.date),
				aggExpenses.map((e) => e.date),
			),
			(e) => format(e, 'yyyy-MM'),
		);
		const sortedAllDates = R.sortBy(allDates, (e) => e);
		const headers = sortedAllDates.map((e) => ({
			key: format(e, 'MMM yyyy'),
		}));
		const revenueRow = R.mapToObj(aggRevenue, (r) => [
			format(r.date, 'MMM yyyy'),
			r.total,
		]);
		const expensesRow = R.mapToObj(aggExpenses, (r) => [
			format(r.date, 'MMM yyyy'),
			r.total,
		]);
		const footer = R.mapToObj(allDates, (r) => {
			const revenue = revenueRow[format(r, 'MMM yyyy')] ?? 0;
			const expenses = expensesRow[format(r, 'MMM yyyy')] ?? 0;
			const sum = kwdFormat(revenue - expenses);
			return [format(r, 'MMM yyyy'), sum];
		});
		const revenueRowStr = R.mapValues(revenueRow, (r) => kwdFormat(r));
		const expensesRowStr = R.mapValues(expensesRow, (r) => kwdFormat(r));
		const rows = [
			{ ...revenueRowStr, id: 'revenue' },
			{ ...expensesRowStr, id: 'expenses' },
		];
		const table = new CTable({
			headers,
			rows,
			footer,
		});
		return table;
	});
