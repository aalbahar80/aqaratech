<script lang="ts">
	import type { IncomeByMonthDto } from '$api/openapi';
	import { revenueChart } from '$lib/components/charts/revenue';
	import { getColor } from '$lib/utils/colors';
	import Chart from '$lib/components/charts/Chart.svelte';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';

	export let income: IncomeByMonthDto;

	$: barDatasets = [
		{
			label: 'Paid',
			borderColor: getColor(0, 2),
			data: income.paid,
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
			data: income.unpaid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(1, 2),
			borderRadius: 10,
		},
	];
</script>

<ChartWrapper empty={income.paid.length < 2 && income.unpaid.length < 2}>
	<Chart let:height let:width>
		<canvas {height} {width} use:revenueChart={barDatasets} />
	</Chart>
</ChartWrapper>
