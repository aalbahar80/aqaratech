<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { revenueChart } from '$lib/components/charts/revenue';
	import { getColor } from '$lib/config/constants';
	import type { ByMonthDto } from '@self/sdk';

	export let incomePaid: ByMonthDto[];
	export let incomeUnpaid: ByMonthDto[];

	$: datasets = [
		{
			label: 'Paid',
			borderColor: getColor(0, 2),
			data: incomePaid,
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
			data: incomeUnpaid,
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
