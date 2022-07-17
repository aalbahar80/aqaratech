<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { incomeChart } from '$lib/components/dashboard/charts/income';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { getColor } from '$lib/config/constants';
	// import { CTable, type TableHeader } from '$lib/models/classes/table.class';
	import type { PaginatedLeaseInvoiceDto } from '@self/sdk';

	export let invoices: PaginatedLeaseInvoiceDto;

	// CHART
	$: datasets = [
		{
			label: 'Paid',
			borderColor: getColor(0, 2),
			data: invoices.results.filter((i) => i.isPaid),
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'postAt',
			},
			backgroundColor: getColor(0, 2),
			borderRadius: 10,
		},
		{
			label: 'Unpaid',
			borderColor: getColor(1, 2),
			data: invoices.results.filter((i) => !i.isPaid),
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'postAt',
			},
			backgroundColor: getColor(1, 2),
			borderRadius: 10,
		},
	];

	// TABLE
	// $: tabular = income.map((i, index) => {
	// 	return {
	// 		id: i.date, // for keyed #each
	// 		date: i.date,
	// 		income: i.amount,
	// 		expense,
	// 		net: i.amount - expense,
	// 	};
	// });

	// const headers: TableHeader[] = [
	// 	{ key: 'status', label: 'Status', style: 'bold1' },
	// 	{ key: 'Amount', label: 'Amount' },
	// 	// { key: 'Location' },
	// 	// { key: 'Unit', style: 'bold2' },
	// 	{ key: 'view', label: 'view', style: 'bold2' },
	// ];

	// $: footer = {
	// 	date: 'Total for period',
	// 	income: income.reduce((acc, i) => acc + i.amount, 0),
	// 	expense: expenses.reduce((acc, i) => acc + i.amount, 0),
	// 	net:
	// 		income.reduce((acc, i) => acc + i.amount, 0) -
	// 		expenses.reduce((acc, i) => acc + i.amount, 0),
	// };

	// $: table = new CTable({
	// 	headers,
	// 	rows: tabular || [],
	// 	footer: {},
	// });
</script>

<DashCard
	title="Income"
	subtitle="Breakdown of rent income by status & property."
	empty={invoices.results.length < 1}
>
	<div slot="chart">
		<Chart let:height let:width>
			<canvas {height} {width} use:incomeChart={datasets} />
		</Chart>
	</div>
	<!-- <div slot="data">
		<CondensedTable {table} />
	</div> -->
</DashCard>
