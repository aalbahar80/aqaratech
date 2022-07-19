<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import NetIncomeTable from '$lib/components/dashboard/cards/NetIncomeTable.svelte';
	import { netChart } from '$lib/components/dashboard/charts/net';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import { getColor } from '$lib/config/constants';
	import type { ByMonthDto } from '@self/sdk';

	export let income: ByMonthDto[];
	export let expenses: ByMonthDto[];

	// CHART
	$: datasets = [
		{
			label: 'Income',
			borderColor: getColor(0, 2),
			data: income,
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
			data: expenses,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(1, 2),
			// borderRadius: 10,
		},
	];
</script>

<DashCard
	title="Net"
	subtitle="Total Rent Income vs Total Expenses"
	empty={expenses.length < 1 && income.length < 1}
>
	<div slot="chart">
		<Chart let:height let:width>
			<canvas {height} {width} use:netChart={datasets} />
		</Chart>
	</div>
	<div slot="data">
		<NetIncomeTable {income} {expenses} />
	</div>
</DashCard>
