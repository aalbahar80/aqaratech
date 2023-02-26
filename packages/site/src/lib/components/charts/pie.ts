import { Chart } from 'chart.js';

type Data = Chart<'pie', number[]>['data'];

export function pie(node: HTMLCanvasElement, data: Data) {
	const chart = new Chart(node, {
		type: 'pie',
		data,
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
