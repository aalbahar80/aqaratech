<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenueChart } from '$lib/components/charts/revenue';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';
	import { getColor } from '$lib/utils/colors';

	import type { IncomeByMonthDto } from '$api/openapi';

	export let income: IncomeByMonthDto;
	export let empty: boolean;

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

<ChartWrapper
	title="Income: by Month"
	subtitle="Total income by month for the selected period."
	{empty}
>
	<Chart let:height let:width>
		<canvas {height} {width} use:revenueChart={barDatasets} />
	</Chart>
</ChartWrapper>
