<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';
	import { revenueChart } from '$lib/components/charts/revenue';
	import { getColor } from '$lib/utils/colors';
	import Chart from '$lib/components/charts/Chart.svelte';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';

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

<ChartWrapper empty={expenses.length < 2}>
	<Chart let:height let:width>
		<canvas {height} {width} use:revenueChart={barDatasets} />
	</Chart>
</ChartWrapper>
