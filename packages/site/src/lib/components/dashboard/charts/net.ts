import { Chart } from 'chart.js/dist/chart.esm';
import { currencyTooltip } from './utils/currency';

export type ChartData = {
	date: Date;
	total: number;
};

type DataSets = Chart<'line', ChartData[]>['data']['datasets'];

export function netChart(node: HTMLCanvasElement, datasets: DataSets) {
	const chart = new Chart(node, {
		type: 'line',
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
		update(datasets: DataSets) {
			chart.data.datasets = datasets;
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
