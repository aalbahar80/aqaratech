<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { netChart } from '$lib/components/dashboard/charts/net';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { getColor } from '$lib/config/constants';
	import { CTable, type TableHeader } from '$lib/models/classes/table.class';
	import type { ByMonthDto } from '@self/sdk';

	export let income: ByMonthDto[];
	export let expenses: ByMonthDto[];

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

	// TABULAR DATA
	$: tabular = income.map((i, index) => {
		const expense = expenses[index]?.amount || 0;
		// format to currency here?
		return {
			id: i.date, // for keyed #each
			date: i.date,
			income: i.amount,
			expense,
			net: i.amount - expense,
		};
	});
	console.log({ tabular }, 'dashboard2.svelte ~ 76');
	// TABLE STYLE
	const headers: TableHeader[] = [
		{
			key: 'date',
			label: 'Date',
			// take any custom style/twind class?
			style: 'bold1',
		},
		{
			key: 'income',
			label: 'Income',
		},
		{
			key: 'expense',
			label: 'Expenses',
		},
		{
			key: 'net',
			label: 'Net',
		},
	];
	$: footer = {
		date: 'Total for period',
		income: income.reduce((acc, i) => acc + i.amount, 0),
		expense: expenses.reduce((acc, i) => acc + i.amount, 0),
		net:
			income.reduce((acc, i) => acc + i.amount, 0) -
			expenses.reduce((acc, i) => acc + i.amount, 0),
	};
	$: console.log({ footer }, 'dashboard2.svelte ~ 121');
	$: tableData = new CTable({
		headers,
		rows: tabular || [],
		footer,
	});
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
		<!-- TODO extract into seperate compoenent + simplify name -->
		<CondensedTable table={tableData} />
	</div>
</DashCard>
