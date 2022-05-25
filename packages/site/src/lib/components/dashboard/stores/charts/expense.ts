import type { InferQueryOutput } from '$lib/client/trpc';
import { getColor } from '$lib/config/constants';
import { getMonths } from '$lib/utils/group';
import { closestTo, isSameDay } from 'date-fns';
import { derived, type Writable } from 'svelte/store';

type Data = InferQueryOutput<'owner:charts:expenses'>;
type GroupBy = 'ratio' | 'property';
type ChartData = {
	total: number;
	date: Date;
	group: string;
	address: string;
}[];

const aggregate = (
	data: Data,
	groupBy: GroupBy,
	expenseMeta: App.Stuff['expenseMeta'],
): ChartData => {
	console.time('aggregate');
	const months = getMonths(data);
	const buckets: ChartData = [];

	data.forEach((trx) => {
		const month = closestTo(trx.postAt, months);
		const group =
			expenseMeta.categories.find((c) => c.id === trx.expenseCategoryId)
				?.expenseGroupId ?? 'other';
		const address = trx.address;
		if (month) {
			const index = buckets.findIndex((bucket) => {
				const condition =
					groupBy === 'property'
						? bucket.address === address
						: bucket.group === group;
				return isSameDay(bucket.date, month) && condition;
			});
			if (index !== -1) {
				buckets[index]!.total += trx.amount;
			} else {
				buckets.push({
					total: trx.amount,
					date: month,
					group: group,
					address,
				});
			}
		}
	});
	console.timeEnd('aggregate');
	return buckets;
};

const getDatasets = (
	data: Data,
	groupBy: GroupBy,
	expenseMeta: App.Stuff['expenseMeta'],
) => {
	console.time('getDatasets');
	const aggregated = aggregate(data, groupBy, expenseMeta);

	const properties = aggregated.map((bucket) => bucket.address); // use id here?
	const uniqueProperties = [...new Set(properties)];
	uniqueProperties.sort((a, b) => a.localeCompare(b)); // alphabetical

	const expenseGroups = expenseMeta.groups.map((c) => c.id);

	const groups = groupBy === 'property' ? uniqueProperties : expenseGroups;
	const datasets = groups.map((group, n) => {
		const backgroundColor = getColor(n, groups.length);
		return {
			label: group,
			data:
				groupBy === 'property'
					? aggregated.filter((item) => item.address === group)
					: aggregated.filter((item) => item.group === group),
			parsing: {
				yAxisKey: 'total',
				xAxisKey: 'date',
			},
			backgroundColor,
			borderRadius: 10,
		};
	});
	console.timeEnd('getDatasets');
	return datasets;
};
export const getExpenseChartStore = (
	expenses: Writable<Data>,
	groupBy: Writable<GroupBy>,
	expenseMeta: App.Stuff['expenseMeta'],
) =>
	derived([expenses, groupBy], ([$expenses, $groupBy]) =>
		getDatasets($expenses, $groupBy, expenseMeta),
	);
