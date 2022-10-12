<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { netChart } from '$lib/components/charts/net';
	import { getColor } from '$lib/utils/colors';
	import type { ByMonthDto } from '$api/openapi';

	export let invoicesGroupedPaid: ByMonthDto[];
	export let expensesGrouped: ByMonthDto[];

	$: datasets = [
		{
			label: 'Income',
			borderColor: getColor(0, 2),
			data: invoicesGroupedPaid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(0, 2),
			// borderRadius: 10,
		},
		{
			label: 'Expenses',
			borderColor: getColor(1, 2),
			data: expensesGrouped,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(1, 2),
			// borderRadius: 10,
		},
	];
</script>

<Chart let:height let:width>
	<canvas {height} {width} use:netChart={datasets} />
</Chart>
