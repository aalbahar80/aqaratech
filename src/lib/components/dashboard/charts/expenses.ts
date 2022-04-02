import type { InferQueryOutput } from '$lib/client/trpc';
import {
	categoryGroups,
	getCategoryGroup,
	getColor,
} from '$lib/config/constants';
import { getMonths } from '$lib/utils/group';
import { Chart } from 'chart.js/dist/chart.esm';
import { closestTo, isSameDay } from 'date-fns';
import { sortBy } from 'lodash-es';
import { currencyTooltip } from './utils/currency';

type Data = InferQueryOutput<'charts:expenses'>;
type GroupBy = 'ratio' | 'property';
type ChartConfig = {
	data: Data;
	groupBy: GroupBy;
};
type Dataset = {
	total: number;
	date: Date;
	category: string;
	propertyId: string;
	// address: string;
}[];

const sort = (data: Data) => sortBy(data, 'postDate');

const aggregate = (data: Data, groupBy: GroupBy): Dataset => {
	const sorted = sort(data);
	const months = getMonths(sorted, 'postDate');

	const buckets: Dataset = [];
	sorted.forEach((trx) => {
		const month = closestTo(trx.postDate, months);
		if (month) {
			// search for the bucket with the same date  propertyId
			const index = buckets.findIndex((bucket) => {
				const condition =
					groupBy === 'property'
						? bucket.propertyId === (trx.propertyId ?? 'Common')
						: bucket.category === trx.category;
				return isSameDay(bucket.date, month) && condition;
			});
			if (index !== -1) {
				buckets[index]!.total += trx.amount;
			} else {
				buckets.push({
					total: trx.amount,
					date: month,
					category: getCategoryGroup(trx.category),
					propertyId: trx.propertyId ?? 'Common', // TODO: group client/prop/unit
					// address: trx
				});
			}
		}
	});
	return buckets;
};

const getDatasets = (data: Data, groupBy: GroupBy) => {
	const aggregated = aggregate(data, groupBy);
	const properties = aggregated.map((bucket) => bucket.propertyId);
	const uniqueProperties = [...new Set(properties)];

	const groups = groupBy === 'property' ? uniqueProperties : categoryGroups;

	const datasets = groups.map((group, n) => {
		const backgroundColor = getColor(n, groups.length);
		return {
			label: group,
			data:
				groupBy === 'property'
					? aggregated.filter((item) => item.propertyId === group)
					: aggregated.filter((item) => item.category === group),
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

export function expensesChart(node: HTMLCanvasElement, config: ChartConfig) {
	const chart = new Chart(node, {
		type: 'bar',
		data: {
			datasets: getDatasets(config.data, config.groupBy),
		},
		options: {
			scales: {
				x: {
					type: 'time',
					stacked: true,
					grid: {
						display: false,
						// drawBorder: false,
					},
				},
				y: {
					stacked: true,
					ticks: {
						// maxTicksLimit: 6,
						autoSkipPadding: 50,
						format: Intl.NumberFormat('en-GB', {
							notation: 'compact',
						}).resolvedOptions(),
					},
					grace: '20%',
					grid: {
						drawTicks: false,
						drawBorder: false,
					},
				},
			},
			plugins: {
				tooltip: {
					callbacks: {
						label: currencyTooltip,
					},
				},
			},
		},
	});

	return {
		update(newChartConfig: ChartConfig) {
			chart.data.datasets = getDatasets(
				newChartConfig.data,
				newChartConfig.groupBy,
			);
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
