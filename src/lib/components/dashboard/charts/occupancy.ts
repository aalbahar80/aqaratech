import type { InferQueryOutput } from '$lib/client/trpc';
import { Chart } from 'chart.js/dist/chart.esm';

export function occupancyChart(
	node: HTMLCanvasElement,
	data: InferQueryOutput<'charts:occupancy'>,
) {
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
						format: Intl.NumberFormat('en-GB', {
							style: 'percent',
						}).resolvedOptions(),
						// labelOffset: 10,
						autoSkipPadding: 50,
					},
					beginAtZero: true,
					max: 1,
					grid: {
						drawTicks: false,
						drawBorder: false,
					},
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
