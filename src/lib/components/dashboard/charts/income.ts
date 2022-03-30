import type { InferQueryOutput } from '$lib/client/trpc';
import { palette } from '$lib/config/constants';
import { getAddress } from '$lib/definitions/property';
import { getMonths } from '$lib/utils/group';
import { Chart } from 'chart.js';

import 'chartjs-adapter-date-fns';
import { closestTo, isSameDay } from 'date-fns';
import { sortBy } from 'lodash-es';

type Data = InferQueryOutput<'charts:income'>;
type GroupBy = 'ratio' | 'property';

const normalize = (data: Data) =>
	data.properties.flatMap((property) =>
		property.units.flatMap((unit) =>
			unit.leases.flatMap((lease) =>
				lease.transactions.flatMap((transaction) => {
					const { amount, isPaid, postDate } = transaction;
					const address = getAddress(property);
					const { propertyId } = unit;
					return { amount, isPaid, postDate, address, propertyId };
				}),
			),
		),
	);

const sort = (data: Data) => sortBy(normalize(data), 'postDate');

type Bucket = {
	total: number;
	date: Date;
	address: string;
	propertyId: string;
	isPaid: boolean;
};
const aggregate = (data: Data, groupBy: GroupBy): Bucket[] => {
	const sorted = sort(data);
	const months = getMonths(sorted, 'postDate');

	const buckets: Bucket[] = [];

	sorted.forEach((trx) => {
		const month = closestTo(trx.postDate, months);
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
	const groups = aggregated
		.map((item) => (groupBy === 'property' ? item.address : item.isPaid))
		.filter((value, index, self) => self.indexOf(value) === index);

	const datasets = groups.map((group, n) => {
		const size = Math.max(3, Math.min(groups.length, 8));
		const backgroundColor = palette[size]?.[n];
		return {
			label: getLabel(group, groupBy),
			// data: aggregated.filter((item) =>
			// 	groupBy === 'property' ? item.address : item.isPaid === group,
			// ),
			data:
				groupBy === 'property'
					? aggregated.filter((item) => item.address === group)
					: aggregated.filter((item) => item.isPaid === group),
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

export function incomeChart(
	node: HTMLCanvasElement,
	[data, groupBy]: [Data, GroupBy],
) {
	Chart.defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
	Chart.defaults.font.size = 16;

	const chart = new Chart(node, {
		type: 'bar',
		data: {
			datasets: getDatasets(data, groupBy),
		},
		options: {
			interaction: {
				mode: 'nearest',
				axis: 'x',
				intersect: false,
			},
			scales: {
				x: {
					type: 'time',
					time: {
						unit: 'month',
						tooltipFormat: 'MMM yy',
						displayFormats: {
							month: 'MMM',
						},
					},
					stacked: true,
					grid: {
						display: false,
						// drawBorder: false,
					},
				},
				y: {
					stacked: true,
					ticks: {
						callback: (value, index, values) =>
							// hide the first tick
							index == values.length - 1
								? undefined
								: Intl.NumberFormat('en-GB', {
										notation: 'compact',
								  }).format(Number(value)),
						// maxTicksLimit: 6,
						autoSkip: true,
						autoSkipPadding: 50,
					},
					// grace: '20%',
					grid: {
						drawTicks: false,
						drawBorder: false,
					},
				},
			},
			plugins: {
				legend: {
					align: 'start',
					labels: {
						usePointStyle: true,
						pointStyle: 'rectRounded',
					},
				},
			},
		},
	});

	return {
		update([newData, newGroupBy]: [Data, GroupBy]) {
			chart.data.datasets = getDatasets(newData, newGroupBy);
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
