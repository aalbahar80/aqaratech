import type { InferQueryOutput } from '$lib/client/trpc';
import Chart, { type ChartData } from 'chart.js/auto/auto.esm'; // TODO treeshake
import 'chartjs-adapter-date-fns';

const colors = [
	'#003f5c',
	'#2f4b7c',
	'#665191',
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
	const datasets: ChartData<'bar', typeof data>['datasets'] = [
		'MANAGEMENT_FEES',
		'HVAC',
		'ELEVATORS',
		'INSURANCE',
		'INTERNET',
		'SATELLITE',
		'LANDSCAPING',
		'AMENITIES',
		'CARETAKER',
		'ELECTRICITY',
		'WATER',
		'PLUMBING',
	].map((cat, n) => ({
		label:
			cat[0]?.toUpperCase() + cat.slice(1).toLowerCase().replace(/_/g, ' '),
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

	Chart.defaults.font.family =
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
	Chart.defaults.font.size = 16;
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
			},
		},
	});

	return {
		update(newData: InferQueryOutput<'charts:expenses'>) {
			chart.data.datasets.forEach((dataset) => {
				dataset.data = newData.filter(
					(item) =>
						item.category?.toUpperCase() === dataset.label?.toUpperCase(),
				);
			});
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
