import { Chart } from 'chart.js/dist/chart.esm';

type DataSets = Chart<'pie', number[]>['data']['datasets'];

export function revenuePie(node: HTMLCanvasElement, datasets: DataSets) {
	const chart = new Chart(node, {
		type: 'pie',
		data: {
			labels: ['Paid', 'Unpaid'],
			datasets: datasets,
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
