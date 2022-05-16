import { Chart } from 'chart.js/dist/chart.esm';
import { currencyTooltip } from './utils/currency';

export type ChartData = {
	date: Date;
	total: number;
};

export type DataSet = Chart<'line', ChartData[]>['data']['datasets'][number];

export function netChart(node: HTMLCanvasElement, datasets: DataSet[]) {
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
		update(datasets: DataSet[]) {
			chart.data.datasets = datasets;
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
