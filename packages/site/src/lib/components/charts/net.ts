import type { ByMonthDto } from '$api/openapi';
import { Chart } from 'chart.js';
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
					time: {
						round: 'day', // https://github.com/chartjs/Chart.js/issues/9470#issuecomment-888837234
					},
					grid: {
						drawOnChartArea: false,
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
