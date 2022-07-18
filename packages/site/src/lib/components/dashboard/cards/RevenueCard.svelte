<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { revenueChart } from '$lib/components/dashboard/charts/revenue';
	import RevenueArea from '$lib/components/dashboard/charts/RevenueArea.svelte';
	import RevenuePie from '$lib/components/dashboard/charts/RevenuePie.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import Select from '$lib/components/Select.svelte';
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

	let chartType = 'ratio';
</script>

<DashCard
	title="Revenue"
	subtitle="Breakdown of rent income by status & property."
	empty={invoices.results.length < 1}
>
	<div slot="groupBy" class="flex w-64 pb-4">
		<span
			class="mt-1 inline-flex w-1/2 items-center break-words rounded-none rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 shadow-sm sm:text-sm"
		>
			Group By
		</span>
		<Select
			bind:current={chartType}
			class="w-1/2 rounded-none rounded-r-md py-0 sm:text-sm"
			options={[
				{ label: 'Ratio', value: 'ratio' },
				{ label: 'Ratio Over Time', value: 'time' },
				{ label: 'Property', value: 'property' },
			]}
		/>
	</div>
	<div slot="chart">
		{#if chartType === 'property'}
			<RevenueArea {invoices} />
		{:else if chartType === 'time'}
			<Chart let:height let:width>
				<canvas {height} {width} use:revenueChart={datasets} />
			</Chart>
		{:else}
			<RevenuePie {invoices} />
		{/if}
	</div>
	<div slot="data">
		<CondensedTable {table} />
	</div>
</DashCard>
