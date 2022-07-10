import { getColor } from '$lib/config/constants';
import { startCase } from '$lib/utils/common';
import { getMonths } from '$lib/utils/group';
import { closestTo, isSameDay } from 'date-fns';
import { derived, type Writable } from 'svelte/store';

type Data = InferQueryOutput<'owner:charts:expenses'>;
type GroupBy = 'ratio' | 'property';
type ChartData = { total: number; date: Date; group: number | string }[];

const aggregate = (
	data: Data,
	groupBy: GroupBy,
	expenseMeta: InferQueryOutput<'public:expenses:meta'>,
): ChartData => {
	console.time('aggregate');
	const months = getMonths(data);
	const buckets: ChartData = [];

	data.forEach((trx) => {
		const month = closestTo(trx.postAt, months);
		const group =
			groupBy === 'property'
				? trx.address
				: expenseMeta.categories.find((c) => c.id === trx.categoryId)
						?.groupId ?? 1;
		if (month) {
			const index = buckets.findIndex((bucket) => {
				const condition = bucket.group === group;
				return isSameDay(bucket.date, month) && condition;
			});
			if (index !== -1) {
				buckets[index]!.total += trx.amount;
			} else {
				buckets.push({
					// g: 'property',
					total: trx.amount,
					date: month,
					group,
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
	expenseMeta: InferQueryOutput<'public:expenses:meta'>,
) => {
	console.time('getDatasets');
	const aggregated = aggregate(data, groupBy, expenseMeta);

	const groups = aggregated.map((bucket) => bucket.group); // use id here?
	const uniqueGroups = [...new Set(groups)];
	uniqueGroups.sort((a, b) => {
		// make sure 'other' is always last
		if (a === 1) {
			return 1;
		}
		if (b === 1) {
			return -1;
		}
		return a.toString().localeCompare(b.toString());
	});

	const datasets = uniqueGroups.map((group, n) => {
		const backgroundColor = getColor(n, uniqueGroups.length);
		return {
			label:
				groupBy === 'property'
					? startCase(group)
					: expenseMeta.groups.find((c) => c.id === group)?.en ?? 'Other',
			data: aggregated.filter((item) => item.group === group),
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
	expenseMeta: InferQueryOutput<'public:expenses:meta'>,
) =>
	derived([expenses, groupBy], ([$expenses, $groupBy]) =>
		getDatasets($expenses, $groupBy, expenseMeta),
	);
