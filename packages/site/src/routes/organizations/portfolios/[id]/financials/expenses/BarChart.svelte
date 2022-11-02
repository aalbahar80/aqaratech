<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenueChart } from '$lib/components/charts/revenue';
	import { getColor } from '$lib/utils/colors';

	export let expenses: GroupByMonthDto[];

	$: barDatasets = [
		{
			label: 'Expenses',
			borderColor: getColor(0, 2),
			data: expenses,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(0, 2),
			borderRadius: 10,
		},
	];
</script>

<Chart let:height let:width>
	<canvas {height} {width} use:revenueChart={barDatasets} />
</Chart>
