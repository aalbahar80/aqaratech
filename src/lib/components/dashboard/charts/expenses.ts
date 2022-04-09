import type { InferQueryOutput } from '$lib/client/trpc';
import { categoryGroups, getColor } from '$lib/config/constants';
import { getAddress } from '$lib/definitions/property';
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
	address: string;
}[];

const sort = (data: Data) => sortBy(data, 'postDate');

const aggregate = (data: Data, groupBy: GroupBy): Dataset => {
	const sorted = sort(data);
	const months = getMonths(sorted);

	const buckets: Dataset = [];
	sorted.forEach((trx) => {
		const month = closestTo(trx.postDate, months);
		const trxCategoryIndex = categoryGroups.findIndex(
			(g) => g[0] === trx.category,
		);
		const expenseGroup = categoryGroups[trxCategoryIndex]?.[3] ?? 'Other';
		const address = trx.relatedProperty
			? getAddress(trx.relatedProperty)
			: 'Common';
		if (month) {
			const index = buckets.findIndex((bucket) => {
				const condition =
					groupBy === 'property'
						? bucket.address === address
						: bucket.category === expenseGroup;
				return isSameDay(bucket.date, month) && condition;
			});
			if (index !== -1) {
				buckets[index]!.total += trx.amount;
			} else {
				buckets.push({
					total: trx.amount,
					date: month,
					category: expenseGroup,
					address,
				});
			}
		}
	});
	return buckets;
};

const getDatasets = (data: Data, groupBy: GroupBy) => {
	const aggregated = aggregate(data, groupBy);

	const properties = aggregated.map((bucket) => bucket.address); // use id here?
	const uniqueProperties = [...new Set(properties)];
	uniqueProperties.sort((a, b) => a.localeCompare(b)); // alphabetical

	const categories = categoryGroups.map((g) => g[3]);
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
