<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { revenueChart } from '$lib/components/dashboard/charts/revenue';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { getColor } from '$lib/config/constants';
	import { CTable, type TableHeader } from '$lib/models/classes/table.class';
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
	$: tabular = invoices.results.map((i) => {
		return {
			id: { label: i.id, hide: true },
			// postAt: i.postAt.toISOString(),
			amount: { label: i.amount },
			status: { label: i.isPaid },
			property: {
				label: i.breadcrumbs.property.label,
				href: i.breadcrumbs.property.href,
			},
			unit: {
				label: i.breadcrumbs.unit.label,
				href: i.breadcrumbs.unit.href,
			},
			view: {
				label: 'View',
				href: `/invoices/${i.id}`,
			},
		};
	});

	const headers: TableHeader[] = [
		// { key: 'postAt', label: 'Date' },
		{ key: 'status', label: 'Status', style: 'bold1' },
		{ key: 'amount', label: 'Amount' },
		{ key: 'unit', label: 'Unit', isHref: true, style: 'regular' },
		{ key: 'property', label: 'Property', style: 'regular' },
		{ key: 'view', label: 'View', isHref: true, hide: true },
	];

	$: footer = {
		amount: invoices.results.reduce((acc, i) => acc + i.amount, 0),
	};

	$: table = new CTable({
		headers,
		rows: tabular || [],
		footer,
	});
</script>

<DashCard
	title="Revenue"
	subtitle="Breakdown of rent income by status & property."
	empty={invoices.results.length < 1}
>
	<div slot="chart">
		<Chart let:height let:width>
			<canvas {height} {width} use:revenueChart={datasets} />
		</Chart>
	</div>
	<div slot="data">
		<CondensedTable {table} />
	</div>
</DashCard>
