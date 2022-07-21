import type { ByMonthDto } from '@self/sdk';
import { Chart } from 'chart.js/dist/chart.esm';
import { currencyTooltip } from './utils/currency';

export type DataSets = Chart<'line', ByMonthDto[]>['data']['datasets'];

export function netChart(node: HTMLCanvasElement, datasets: DataSets) {
	const chart = new Chart(node, {
		type: 'line',
		data: { datasets },
		options: {
			scales: {
				x: {
					type: 'time',
					grid: {
						display: false,
						// drawBorder: false,
					},
				},
				y: {
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
			chart.data.datasets = datasets;
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
