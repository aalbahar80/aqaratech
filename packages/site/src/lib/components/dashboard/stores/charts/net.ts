import type { InferQueryOutput } from '$lib/client/trpc';
import {
	addMonths,
	closestTo,
	startOfMonth,
	subMonths,
	format,
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

export const getNetChartStore = (
	income: Writable<Income>,
	expenses: Writable<Expense>,
) =>
	// TODO: derived updates when both income and expenses are updated
	// TODO: instead, derive everything from filters?
	derived([income, expenses], ([$income, $expenses]) => {
		const revenue = R.filter($income, (e) => e.isPaid);
		const a = revenue.map((e) =>
			R.pick(e, ['id', 'amount', 'postAt', 'isPaid']),
		);
		const b = R.groupBy(a, (e) => format(e.postAt, 'yyyy-MM'));
		const c = R.mapValues(b, (v) => R.reduce(v, (acc, e) => acc + e.amount, 0));
		const d = Object.entries(c).map(([k, v]) => ({
			date: new Date(k),
			revenue: v,
		}));
		console.log({ d }, 'net.ts ~ 50');

		const costs = R.groupBy($expenses, (e) => format(e.postAt, 'yyyy-MM'));
		const cc = R.mapValues(costs, (v) =>
			R.reduce(v, (acc, e) => acc + e.amount, 0),
		);
		const cd = Object.entries(cc).map(([k, v]) => ({
			date: new Date(k),
			expenses: v,
		}));
		return {
			income: d,
			expenses: cd,
		};
	});
