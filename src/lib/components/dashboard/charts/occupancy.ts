import type { InferQueryOutput } from '$lib/client/trpc';
import Chart from 'chart.js/auto/auto.esm'; // TODO treeshake
import 'chartjs-adapter-date-fns';

export function occupancyChart(
	node: HTMLCanvasElement,
	data: InferQueryOutput<'charts:occupancy'>,
) {
	Chart.defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
	Chart.defaults.font.size = 16;
	const chart = new Chart(node, {
		type: 'line',
		data: {
			datasets: [
				{
					label: 'Occupied',
					data: data,
					backgroundColor: 'hsl(199, 100%, 18%)',
					tension: 0.4,
					parsing: {
						yAxisKey: 'occupiedPct',
						xAxisKey: 'date',
					},
					fill: true,
				},
				{
					label: 'Vacant',
					data: data,
					backgroundColor: 'hsl(348, 83%, 64%)',
					tension: 0.4,
					parsing: {
						yAxisKey: 'vacantPct',
						xAxisKey: 'date',
					},
					fill: true,
				},
			],
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
						format: Intl.NumberFormat('en-GB', {
							style: 'percent',
						}).resolvedOptions(),
						// labelOffset: 10,
						align: 'start',
					},
					beginAtZero: true,
					max: 1,
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
				tooltip: {
					xAlign: 'center',
					yAlign: 'bottom',
					usePointStyle: true,
				},
			},
		},
	});

	return {
		update(newData: InferQueryOutput<'charts:occupancy'>) {
			if (chart.data.datasets[0] && chart.data.datasets[1]) {
				chart.data.datasets[0].data = newData;
				chart.data.datasets[1].data = newData;
				chart.update();
			}
		},
		destory() {
			chart.destroy();
		},
	};
}
