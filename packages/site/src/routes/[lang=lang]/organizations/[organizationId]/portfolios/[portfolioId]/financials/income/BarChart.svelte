<script lang="ts">
	import type { IncomeByMonthDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenueChart } from '$lib/components/charts/revenue';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';
	import { getColor } from '$lib/utils/colors';

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
	title={$L.charts.incomeBar.title()}
	subtitle={$L.charts.incomeBar.subtitle()}
	{empty}
>
	<Chart let:height let:width>
		<canvas {height} {width} use:revenueChart={barDatasets} />
	</Chart>
</ChartWrapper>
