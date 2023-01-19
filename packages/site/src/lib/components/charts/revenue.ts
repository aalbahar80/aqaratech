import { Chart, type ChartDataset } from 'chart.js';

import { currencyTooltip } from './utils/currency';

import type { GroupByMonthDto } from '$api/openapi';

type DataSets = ChartDataset<'bar', GroupByMonthDto[]>[];

export function revenueChart(node: HTMLCanvasElement, datasets: DataSets) {
	const chart = new Chart(node, {
		type: 'bar',
		data: { datasets },
		options: {
			scales: {
				x: {
					type: 'time',
					time: {
						round: 'day',
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
						// maxTicksLimit: 6,
						autoSkipPadding: 50,
						format: Intl.NumberFormat('en-GB', {
							notation: 'compact',
						}).resolvedOptions(),
					},
					grace: '20%',
					grid: {
						drawTicks: false,
					},
					border: {
						display: false,
					},
				},
			},
			interaction: {
				mode: 'nearest',
				axis: 'x',
				intersect: false,
				includeInvisible: false,
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
		update(datasets: DataSets) {
			// @ts-expect-error - chart.js types are wrong - missing custom data type which is parsed by `parsing` property
			// https://www.chartjs.org/docs/latest/general/data-structures.html#data-structures
			chart.data.datasets = datasets;
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
