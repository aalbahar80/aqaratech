<script lang="ts">
	import HeroiconsChartPie from '~icons/heroicons/chart-pie';
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
			class="w-full overflow-hidden rounded-lg bg-white p-8 shadow"
			style="height: {height}px;"
		>
			<div
				class="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center"
			>
				<HeroiconsChartPie class="mx-auto h-20 w-20  text-gray-300" />
				<span class="block pt-8 text-xl font-light text-gray-900">No data</span>
			</div>
		</div>
	{/if}
</Chart>
