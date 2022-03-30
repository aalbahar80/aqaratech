import type { InferQueryOutput } from '$lib/client/trpc';
import { palette } from '$lib/config/constants';
import { getAddress } from '$lib/definitions/property';
import { getMonths } from '$lib/utils/group';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { closestTo, eachMonthOfInterval, isSameDay } from 'date-fns';
import { sortBy } from 'lodash-es';

const normalize = (data: InferQueryOutput<'charts:income:byProperty'>) =>
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

const sort = (data: InferQueryOutput<'charts:income:byProperty'>) =>
	sortBy(normalize(data), 'postDate');

type Bucket = {
	total: number;
	date: Date;
	address: string;
	propertyId: string;
};
const group = (
	data: InferQueryOutput<'charts:income:byProperty'>,
): Bucket[] => {
	const sorted = sort(data);
	const months = getMonths(sorted, 'postDate');

	const buckets: Bucket[] = [];

	sorted.forEach((trx) => {
		const month = closestTo(trx.postDate, months);
		if (month) {
			// search for the bucket with the same date  propertyId
			const index = buckets.findIndex(
				(bucket) =>
					isSameDay(bucket.date, month) && bucket.propertyId === trx.propertyId,
			);
			if (index !== -1) {
				buckets[index]!.total += trx.amount;
			} else {
				buckets.push({
					total: trx.amount,
					date: month,
					address: trx.address,
					propertyId: trx.propertyId,
				});
			}
		}
	});
	return buckets;
};

const getDatasets = (data: InferQueryOutput<'charts:income:byProperty'>) => {
	const grouped = group(data);
	const properties = grouped
		.map((item) => item.address)
		.filter((value, index, self) => self.indexOf(value) === index);

	const datasets = properties.map((property, n) => {
		const size = Math.max(3, Math.min(properties.length, 8));
		const backgroundColor = palette[size]?.[n];
		return {
			// label: getAddress(property),
			label: property,
			data: grouped.filter((item) => item.address === property),
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

export function incomeByPropertyChart(
	node: HTMLCanvasElement,
	data: InferQueryOutput<'charts:income:byProperty'>,
) {
	Chart.defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
	Chart.defaults.font.size = 16;

	const chart = new Chart(node, {
		type: 'bar',
		data: {
			datasets: getDatasets(data),
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
								: // format the value
								  Intl.NumberFormat('en-GB', {
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
		update(newData: InferQueryOutput<'charts:income:byProperty'>) {
			chart.data.datasets = getDatasets(newData);
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
