import type { InferQueryOutput } from '$lib/client/trpc';
import { expenseCats, getColor } from '$lib/config/constants';
import { startCase } from '$lib/utils/common';
import { getMonths } from '$lib/utils/group';
import { closestTo, isSameDay } from 'date-fns';
import { derived, type Writable } from 'svelte/store';

type Data = InferQueryOutput<'owner:charts:expenses'>;
type GroupBy = 'ratio' | 'property';
type ChartData = {
	total: number;
	date: Date;
	category: string;
	address: string;
}[];

const aggregate = (data: Data, groupBy: GroupBy): ChartData => {
	console.time('aggregate');
	const months = getMonths(data);
	const buckets: ChartData = [];

	data.forEach((trx) => {
		const month = closestTo(trx.postAt, months);
		const group =
			expenseCats.find((g) => g.en === trx.category)?.group ?? 'OTHER';
		const groupLabel = startCase(group);
		const address = trx.address;
		if (month) {
			const index = buckets.findIndex((bucket) => {
				const condition =
					groupBy === 'property'
						? bucket.address === address
						: bucket.category === groupLabel;
				return isSameDay(bucket.date, month) && condition;
			});
			if (index !== -1) {
				buckets[index]!.total += trx.amount;
			} else {
				buckets.push({
					total: trx.amount,
					date: month,
					category: groupLabel,
					address,
				});
			}
		}
	});
	console.timeEnd('aggregate');
	return buckets;
};

const getDatasets = (data: Data, groupBy: GroupBy) => {
	console.time('getDatasets');
	const aggregated = aggregate(data, groupBy);

	const properties = aggregated.map((bucket) => bucket.address); // use id here?
	const uniqueProperties = [...new Set(properties)];
	uniqueProperties.sort((a, b) => a.localeCompare(b)); // alphabetical

	const categories = expenseCats.map((g) => startCase(g.group));
	const uniqueCategories = [...new Set(categories)];

	const groups = groupBy === 'property' ? uniqueProperties : uniqueCategories;
	const datasets = groups.map((group, n) => {
		const backgroundColor = getColor(n, groups.length);
		return {
			label: group,
			data:
				groupBy === 'property'
					? aggregated.filter((item) => item.address === group)
					: aggregated.filter((item) => item.category === group),
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
) =>
	derived([expenses, groupBy], ([$expenses, $groupBy]) =>
		getDatasets($expenses, $groupBy),
	);
