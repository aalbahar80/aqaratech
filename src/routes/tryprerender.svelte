<script context="module">
	import Chart from 'chart.js/auto/auto.esm';
	export const prerender = true;
</script>

<script lang="ts">
	function action(node, config) {
		const chart = new Chart(node, {
			type: 'bar',
			...config,
		});

		return {
			update(config) {
				chart.data = {
					...chart.data,
					...config.data,
				};
				chart.update();
			},
			destroy() {
				chart.destroy();
			},
		};
	}
	let getConfig = () => ({
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
