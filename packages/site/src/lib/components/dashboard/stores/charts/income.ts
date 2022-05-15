import type { InferQueryOutput } from '$lib/client/trpc';
import type { ChartData } from '$lib/components/dashboard/charts/income';
import { getColor } from '$lib/config/constants';
import { getMonths } from '$lib/utils/group';
import { closestTo, isSameDay } from 'date-fns';
import { derived, type Writable } from 'svelte/store';

type Data = InferQueryOutput<'owner:charts:income'>;
type GroupBy = 'ratio' | 'property';
type Bucket = ChartData;

export const aggregate = (data: Data, groupBy: GroupBy): Bucket[] => {
	const months = getMonths(data);
	const buckets: Bucket[] = [];

	data.forEach((trx) => {
		const month = closestTo(trx.postAt, months);
		if (month) {
			// search for the bucket with the same date  propertyId
			const index = buckets.findIndex((bucket) => {
				const condition =
					groupBy === 'property'
						? bucket.propertyId === trx.propertyId
						: bucket.isPaid === trx.isPaid;
				return isSameDay(bucket.date, month) && condition;
			});
			if (index !== -1) {
				buckets[index]!.total += trx.amount;
			} else {
				buckets.push({
					total: trx.amount,
					date: month,
					address: trx.address,
					propertyId: trx.propertyId,
					isPaid: trx.isPaid,
				});
			}
		}
	});
	return buckets;
};
export const group = (data: Bucket[], groupBy: GroupBy): Bucket[] => {
	if (groupBy === 'ratio') {
		data.sort((a, b) => +b.isPaid - +a.isPaid); // true first
	} else if (groupBy === 'property') {
		data.sort((a, b) => a.address.localeCompare(b.address)); // alphabetical
	}
	return data;
};

const getLabel = <T>(group: T, groupBy: GroupBy): string => {
	if (groupBy === 'ratio' || typeof group === 'boolean') {
		return group ? 'Paid' : 'Unpaid';
	} else if (typeof group === 'string') {
		return group;
	} else {
		return '';
	}
};

const getDatasets = (data: Data, groupBy: GroupBy) => {
	const aggregated = aggregate(data, groupBy);
	const grouped = group(aggregated, groupBy);
	const groups = grouped
		.map((item) => (groupBy === 'property' ? item.address : item.isPaid))
		.filter((value, index, self) => self.indexOf(value) === index);

	const datasets = groups.map((group, n) => {
		const backgroundColor = getColor(n, groups.length);
		return {
			label: getLabel(group, groupBy),
			data:
				groupBy === 'property'
					? grouped.filter((item) => item.address === group)
					: grouped.filter((item) => item.isPaid === group),
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

export const getIncomeChartStore = (
	income: Writable<Data>,
	groupBy: Writable<GroupBy>,
) =>
	derived([income, groupBy], ([$income, $groupBy]) =>
		getDatasets($income, $groupBy),
	);
