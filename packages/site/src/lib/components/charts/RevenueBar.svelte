<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { revenueChart } from '$lib/components/charts/revenue';
	import { getColor } from '$lib/config/constants';
	import type { ByMonthDto } from '@self/sdk';

	export let incomeGroupedPaid: ByMonthDto[];
	export let incomeGroupedUnpaid: ByMonthDto[];

	$: datasets = [
		{
			label: 'Paid',
			borderColor: getColor(0, 2),
			data: incomeGroupedPaid,
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
			data: incomeGroupedUnpaid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(1, 2),
			borderRadius: 10,
		},
	];
</script>

<Chart let:height let:width>
	<canvas {height} {width} use:revenueChart={datasets} />
</Chart>
