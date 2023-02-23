<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenueChart } from '$lib/components/charts/revenue';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';
	import { getColor } from '$lib/utils/colors';

	export let expenses: GroupByMonthDto[];

	$: barDatasets = [
		{
			label: $L.entity.expense.plural(),
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
	title={$L.charts.expensesBar.title()}
	subtitle={$L.charts.expensesBar.subtitle()}
>
	<Chart let:height let:width>
		<canvas {height} {width} use:revenueChart={barDatasets} />
	</Chart>
</ChartWrapper>
