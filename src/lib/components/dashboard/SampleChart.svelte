<script lang="ts">
	import Chart, {
		type ChartData,
		type ChartOptions,
	} from 'chart.js/auto/auto.esm';

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
					label: 'Paid',
					data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 5)),
					backgroundColor: ['hsl(199, 100%, 18%)'],
					borderColor: ['hsl(199, 100%, 28%)'],
					borderWidth: 5,
				},
				{
					label: 'Unpaid',
					data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 5)),
					backgroundColor: ['hsl(348, 83%, 64%)'],
					borderColor: ['hsl(348, 83%, 84%)'],
					borderWidth: 5,
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
				x: {
					stacked: true,
				},
			},
		},
	});
	let config = getConfig();
	$: console.log(config);
</script>

<canvas width="400" height="400" use:action={config} />

<button
	on:click={() => {
		config = getConfig();
	}}>update chart</button
>
