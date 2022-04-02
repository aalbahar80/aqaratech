<script context="module" lang="ts">
	import MyChart from '$lib/components/Chart.svelte';
	import { Chart } from 'chart.js/dist/chart.esm';

	export const prerender = true;
</script>

<script lang="ts">
	function sampleChart(node: HTMLCanvasElement, config: number[]) {
		const chart = new Chart(node, {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [
					{
						label: '# of Votes',
						data: Array.from({ length: 6 }, () =>
							Math.floor(Math.random() * 10),
						),
						backgroundColor: [
							'#003f5c',
							'#444e86',
							'#955196',
							'#dd5182',
							'#ff6e54',
							'#ffa600',
						],
						borderColor: [
							'#003f5c',
							'#444e86',
							'#955196',
							'#dd5182',
							'#ff6e54',
							'#ffa600',
						],
						borderWidth: 1,
					},
				],
			},
		});

		return {
			update(newConfig: number[]) {
				if (chart.data.datasets[0]?.data) {
					chart.data.datasets[0].data = newConfig;
				}
				chart.update();
			},
			destroy() {
				chart.destroy();
			},
		};
	}

	let getConfig = () =>
		Array.from({ length: 6 }, () => Math.floor(Math.random() * 10));

	let config = getConfig();
</script>

<div class="mx-auto flex max-w-screen-lg flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<MyChart>
		<canvas use:sampleChart={config} />
	</MyChart>
	<button
		on:click={() => {
			config = getConfig();
		}}>update chart</button
	>
</div>
