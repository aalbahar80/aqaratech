import { Chart } from 'chart.js';

import { get } from 'svelte/store';

import L from '$i18n/i18n-svelte';

type DataSets = Chart<'pie', number[]>['data']['datasets'];

export function revenuePie(node: HTMLCanvasElement, datasets: DataSets) {
	const LL = get(L);
	const chart = new Chart(node, {
		type: 'pie',
		data: {
			labels: [LL.badge.paid(), LL.badge.unpaid()],
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
