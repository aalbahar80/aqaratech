<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenuePie } from '$lib/components/charts/revenue-pie';
	import type { PageData } from './$types';

	export let data: PageData;

	$: datasets = [
		{
			label: 'Payment Status',
			data: [
				data.income.paid.reduce((acc, i) => acc + i.amount, 0),
				data.income.unpaid.reduce((acc, i) => acc + i.amount, 0),
			],
			backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
		},
	];
</script>

<a href="income/table">Table</a>

<Chart let:height let:width>
	{#if datasets?.[0].data[0] > 0 || datasets[0]?.data[1] > 0}
		<canvas {height} {width} use:revenuePie={datasets} />
	{:else}
		<div
			class="w-full overflow-hidden rounded-lg bg-white  shadow"
			style="height: {height}px;"
		>
			<div class="px-4 py-5 sm:p-6">
				<p>No data</p>
			</div>
		</div>
	{/if}
</Chart>
