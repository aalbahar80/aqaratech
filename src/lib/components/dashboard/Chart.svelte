<script lang="ts">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import Chart from 'chart.js/auto/auto.esm';
	import 'chartjs-adapter-date-fns';

	export let data: InferQueryOutput<'charts:income'>;

	function action(node: HTMLCanvasElement) {
		const chart = new Chart(node, {
			type: 'bar',
			data: {
				datasets: [
					{
						label: 'Paid rent',
						data: data.filter((i) => i.isPaid),
						parsing: {
							yAxisKey: 'amount',
							xAxisKey: 'date',
						},
						backgroundColor: ['hsl(199, 100%, 18%)'],
						borderColor: ['hsl(199, 100%, 48%)'],
						borderWidth: 0,
					},
					{
						label: 'Unpaid rent',
						data: data.filter((i) => !i.isPaid),
						parsing: {
							yAxisKey: 'amount',
							xAxisKey: 'date',
						},
						backgroundColor: ['hsl(348, 83%, 64%)'],
						borderColor: ['hsl(348, 83%, 84%)'],
						borderWidth: 0,
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
						},
						stacked: true,
					},
					y: {
						stacked: true,
					},
				},
			},
		});
	}
</script>

<canvas width="400" height="400" use:action />

<!-- <button
	on:click={() => {
		config = getConfig();
	}}>update chart</button
> -->
<pre>{JSON.stringify(data, null, 2)}</pre>
