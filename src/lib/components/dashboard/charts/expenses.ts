import type { InferQueryOutput } from '$lib/client/trpc';
import {
	categoryGroups,
	categoryLabels,
	getCategoryByLabel,
} from '$lib/config/constants';
import type { ChartData } from 'chart.js';
import * as pkg from 'chart.js';

const { Chart } = pkg;

const colors = [
	'#003f5c',
	'#2f4b7c',
	// '#665191',
	'#a05195',
	'#d45087',
	'#f95d6a',
	'#ff7c43',
	'#ffa600',
];

export function expensesChart(
	node: HTMLCanvasElement,
	data: InferQueryOutput<'charts:expenses'>,
) {
	const datasets: ChartData<'bar', typeof data>['datasets'] =
		categoryGroups.map((cat, n) => ({
			label: categoryLabels[cat],
			data: data.filter(
				(item) => item.category?.toUpperCase() === cat.toUpperCase(),
			),
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: colors[n],
			borderRadius: 10,
		}));
	const chart = new Chart(node, {
		type: 'bar',
		data: {
			datasets,
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
		},
	});

	return {
		update(newData: InferQueryOutput<'charts:expenses'>) {
			chart.data.datasets.forEach((dataset) => {
				dataset.data = newData.filter((item) => {
					const newCategory = categoryLabels[item.category];
					if (newCategory) {
						return (
							getCategoryByLabel(newCategory).toUpperCase() ===
							dataset.label?.toUpperCase()
						);
					}
					return;
				});
			});
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
