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
					label: '# of Votes',
					data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)),
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)',
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)',
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

<canvas width="400" height="400" use:action={config} />

<button
	on:click={() => {
		config = getConfig();
	}}>update chart</button
>
