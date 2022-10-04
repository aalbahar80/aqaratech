import { Chart } from 'chart.js';

type DataSets = Chart<'polarArea', number[]>['data']['datasets'];
interface Data {
	labels: string[];
	datasets: DataSets;
}

export function polarArea(node: HTMLCanvasElement, data: Data) {
	const chart = new Chart(node, {
		type: 'polarArea',
		data,
		options: {
			plugins: {
				legend: {
					display: false,
				},
			},
		},
	});

	return {
		update(data: Data) {
			chart.data = data;
			chart.update();
		},
		destory() {
			chart.destroy();
		},
	};
}
