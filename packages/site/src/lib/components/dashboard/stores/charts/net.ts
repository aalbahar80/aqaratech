import type { InferQueryOutput } from '$lib/client/trpc';
import { aggregate } from '$lib/components/dashboard/stores/charts/income';
import { derived, type Writable } from 'svelte/store';
import * as R from 'remeda';

type Income = InferQueryOutput<'owner:charts:income'>;
type Expense = InferQueryOutput<'owner:charts:expenses'>;

export const getNetChartStore = (
	income: Writable<Income>,
	expenses: Writable<Expense>,
) =>
	derived([income, expenses], ([$income, $expenses]) => {
		const revenue = aggregate($income, 'ratio').filter((e) => e.isPaid);
		const costs = R.groupBy($expenses, (e) =>
			e.postAt.toISOString().slice(0, 7),
		);
		const mapped = R.mapValues(costs, (e) =>
			e.reduce((a, b) => a + b.amount, 0),
		);
		// return revenue;
		// return costs;
		return mapped;
		// return $income;
		// return getDatasets($expenses, $income);
	});
