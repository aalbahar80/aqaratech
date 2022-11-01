<script lang="ts">
	import type { IncomeByMonthDto } from '$api/openapi';
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenuePie } from '$lib/components/charts/revenue-pie';

	export let income: IncomeByMonthDto;

	$: paid = income.paid.reduce((acc, i) => acc + i.amount, 0);
	$: unpaid = income.unpaid.reduce((acc, i) => acc + i.amount, 0);

	$: pieDatasets = [
		{
			label: 'Payment Status',
			data: [paid, unpaid],
			backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
		},
	];
</script>

<Chart let:height let:width>
	{#if paid > 0 || unpaid > 0}
		<canvas {height} {width} use:revenuePie={pieDatasets} />
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
