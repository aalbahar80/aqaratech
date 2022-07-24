<script lang="ts">
	import RevenueBar from '$lib/components/charts/RevenueBar.svelte';
	import RevenuePie from '$lib/components/charts/RevenuePie.svelte';
	import RevenuePolarArea from '$lib/components/charts/RevenuePolarArea.svelte';
	import RevenueTable from '$lib/components/dashboard/cards/RevenueTable.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import Select from '$lib/components/Select.svelte';
	import type { ByMonthDto, PaginatedLeaseInvoiceDto } from '@self/sdk';

	export let invoices: PaginatedLeaseInvoiceDto;
	export let invoicesGroupedPaid: ByMonthDto[];
	export let invoicesGroupedUnpaid: ByMonthDto[];
	export let disabledPropertyBreakdown = false;

	let chartType = 'time';
</script>

<DashCard
	title="Revenue"
	subtitle="Breakdown of rent income by status & property."
	empty={invoices.results.length < 1}
>
	<div slot="groupBy" class="flex h-14 w-1/3 pb-4">
		<span
			class="mt-1 inline-flex w-full items-center break-words rounded-none rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 shadow-sm sm:text-sm"
		>
			Group By
		</span>
		<Select
			bind:current={chartType}
			class="rounded-none rounded-r-md py-0 sm:text-sm"
			options={[
				{ label: 'Ratio', value: 'ratio' },
				{ label: 'Time', value: 'time' },
				...(disabledPropertyBreakdown
					? []
					: [{ label: 'Property', value: 'property' }]),
			]}
		/>
	</div>
	<div slot="chart">
		{#if chartType === 'property'}
			<RevenuePolarArea {invoices} />
		{:else if chartType === 'time'}
			<RevenueBar {invoicesGroupedPaid} {invoicesGroupedUnpaid} />
		{:else}
			<RevenuePie {invoices} />
		{/if}
	</div>
	<div slot="data">
		<RevenueTable {invoices} />
	</div>
</DashCard>
