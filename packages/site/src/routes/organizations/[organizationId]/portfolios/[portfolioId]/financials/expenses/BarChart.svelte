<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenueChart } from '$lib/components/charts/revenue';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';
	import { getColor } from '$lib/utils/colors';

	import type { GroupByMonthDto } from '$api/openapi';

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

<ChartWrapper
	empty={expenses.every((e) => e.amount === 0)}
	title="Expenses: by Month"
	subtitle="Total expenses by month for the selected period."
>
	<Chart let:height let:width>
		<canvas {height} {width} use:revenueChart={barDatasets} />
	</Chart>
</ChartWrapper>
