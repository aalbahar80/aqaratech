<script lang="ts">
	import type { IncomeByMonthDto } from '$api/openapi';
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenuePie } from '$lib/components/charts/revenue-pie';
	import { getColor } from '$lib/utils/colors';

	export let income: IncomeByMonthDto;

	$: paid = income.paid.reduce((acc, i) => acc + i.amount, 0);
	$: unpaid = income.unpaid.reduce((acc, i) => acc + i.amount, 0);

	$: pieDatasets = [
		{
			label: 'Payment Status',
			data: [paid, unpaid],
			backgroundColor: [getColor(0, 2), getColor(1, 2)],
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
