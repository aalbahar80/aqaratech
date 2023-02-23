import { Chart } from 'chart.js';

import { get } from 'svelte/store';
import { toBrowserLocale } from '@self/utils';

import { currencyTooltip } from './utils/currency';

import type { GroupByMonthDto } from '$api/openapi';

import { locale } from '$i18n/i18n-svelte';

type DataSets = Chart<'bar', GroupByMonthDto[]>['data']['datasets'];

export function revenueChart(node: HTMLCanvasElement, datasets: DataSets) {
	const CL = toBrowserLocale(get(locale));
	const chart = new Chart(node, {
		type: 'bar',
		data: { datasets },
		options: {
			scales: {
				x: {
					type: 'time',
					time: {
						round: 'day',
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
						// maxTicksLimit: 6,
						autoSkipPadding: 50,
					},
					grace: '20%',
					grid: {
						drawTicks: false,
					},
					border: {
						display: false,
					},
				},
			},
			interaction: {
				mode: 'nearest',
				axis: 'x',
				intersect: false,
				includeInvisible: false,
			},
			plugins: {
				tooltip: {
					callbacks: {
						label(tooltipItem) {
							return currencyTooltip(tooltipItem, CL);
						},
					},
				},
			},
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
