<script context="module" lang="ts">
	import Chart, {
		type ChartData,
		type ChartOptions,
	} from 'chart.js/auto/auto.esm';

	export const prerender = true;
</script>

<script lang="ts">
	type ChartStuff = {
		data: ChartData<'bar'>;
		options: ChartOptions<'bar'>;
	};

	function action(node: HTMLCanvasElement, config: ChartStuff) {
		const chart = new Chart(node, {
			type: 'bar',
			...config,
		});

		return {
			update(newConfig: ChartStuff) {
				chart.data = {
					...chart.data,
					...newConfig.data,
				};
				chart.update();
			},
			destroy() {
				chart.destroy();
			},
		};
	}
	let getConfig = (): ChartStuff => ({
		data: {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [
				{
					label: '# of Votes',
					data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)),
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
		options: {
			interaction: {
				mode: 'nearest',
				axis: 'x',
				intersect: false,
			},
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	});
	let config = getConfig();
	$: console.log(config);
</script>

<div class="mx-auto flex max-w-screen-lg flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<canvas width="400" height="400" use:action={config} />

	<button
		on:click={() => {
			config = getConfig();
		}}>update chart</button
	>
</div>
