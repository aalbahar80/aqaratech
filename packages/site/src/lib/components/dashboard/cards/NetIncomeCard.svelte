<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { netChart } from '$lib/components/dashboard/charts/net';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { getColor } from '$lib/config/constants';
	import { CTable, type TableHeader } from '$lib/models/classes/table.class';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
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

	// TABLE
	$: tabular = income.map((i, index) => {
		const expense = expenses[index]?.amount || 0;
		return {
			id: { label: i.date, hide: true },
			date: { label: toUTCFormat(new Date(i.date)) },
			income: { label: kwdFormat(i.amount) },
			expense: { label: kwdFormat(expense), extraStyles: ['text-red-600'] },
			net: { label: kwdFormat(i.amount - expense) },
		};
	});

	const headers: TableHeader[] = [
		{ key: 'date', label: 'Date' },
		{ key: 'income', label: 'Income' },
		{ key: 'expense', label: 'Expenses' },
		{ key: 'net', label: 'Net', style: 'bold1' },
	];

	$: footer = {
		date: 'Total for period',
		income: kwdFormat(income.reduce((acc, i) => acc + i.amount, 0)),
		expense: kwdFormat(expenses.reduce((acc, i) => acc + i.amount, 0)),
		net: kwdFormat(
			income.reduce((acc, i) => acc + i.amount, 0) -
				expenses.reduce((acc, i) => acc + i.amount, 0),
		),
	};

	$: table = new CTable({
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
		<CondensedTable {table} />
	</div>
</DashCard>
