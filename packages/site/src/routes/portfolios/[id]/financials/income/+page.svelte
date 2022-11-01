<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenueChart } from '$lib/components/charts/revenue';
	import { revenuePie } from '$lib/components/charts/revenue-pie';
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import { getColor } from '$lib/utils/colors';
	import type { PageData } from './$types';

	export let data: PageData;

	$: paid = data.income.paid.reduce((acc, i) => acc + i.amount, 0);
	$: unpaid = data.income.unpaid.reduce((acc, i) => acc + i.amount, 0);

	$: pieDatasets = [
		{
			label: 'Payment Status',
			data: [paid, unpaid],
			backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
		},
	];

	$: barDatasets = [
		{
			label: 'Paid',
			borderColor: getColor(0, 2),
			data: data.income.paid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(0, 2),
			borderRadius: 10,
		},
		{
			label: 'Unpaid',
			borderColor: getColor(1, 2),
			data: data.income.unpaid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(1, 2),
			borderRadius: 10,
		},
	];
</script>

<RangeSelect />

<a href="income/table">Table</a>

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

<Chart let:height let:width>
	<canvas {height} {width} use:revenueChart={barDatasets} />
</Chart>
