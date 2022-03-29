import type { InferQueryOutput } from '$lib/client/trpc';
import { getAddress } from '$lib/definitions/property';
import Chart from 'chart.js/auto/auto.esm'; // TODO treeshake
import 'chartjs-adapter-date-fns';

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

export function incomeByPropertyChart(
	node: HTMLCanvasElement,
	data: InferQueryOutput<'charts:income:byProperty'>,
) {
	Chart.defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
	Chart.defaults.font.size = 16;

	console.log({ data }, 'incomeByProperty.ts ~ 24');
	const properties = data
		// .map((item) => item.lease.unit.property.id)
		.map((item) => item.propertyId)
		.filter((value, index, self) => self.indexOf(value) === index);

	const datasets = properties.map((property, n) => ({
		// label: getAddress(property),
		label: property,
		data: data.filter((item) => item.propertyId === property),
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
				tooltip: {
					xAlign: 'center',
					yAlign: 'bottom',
					usePointStyle: true,
					// backgroundColor: '#fff',
					// titleColor: '#000',
					// bodyColor: '#000',
					// borderColor: '#000',
					// borderWidth: 1,
					// titleSpacing: 30,
					// bodyFont: {
					// 	size: 16,
					// 	lineHeight: 1.5
					// }
				},
			},
		},
	});

	return {
		update(newData: InferQueryOutput<'charts:income'>) {
			if (chart.data.datasets[0] && chart.data.datasets[1]) {
				chart.data.datasets[0].data = newData.filter((i) => i.isPaid);
				chart.data.datasets[1].data = newData.filter((i) => !i.isPaid);
				chart.update();
			}
		},
		destory() {
			chart.destroy();
		},
	};
}
