import { Chart } from 'chart.js/dist/chart.esm';
import { currencyTooltip } from './utils/currency';

type ChartData = {
	total: number;
	date: Date;
	group: string;
};
type DataSets = Chart<'bar', ChartData[]>['data']['datasets'];

export function expensesChart(node: HTMLCanvasElement, datasets: DataSets) {
	console.time('creating chart');
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
	console.timeEnd('creating chart');

	return {
		update(datasets: DataSets) {
			console.time('updating chart');
			chart.data.datasets = datasets;
			chart.update();
			console.timeEnd('updating chart');
		},
		destory() {
			chart.destroy();
		},
	};
}
