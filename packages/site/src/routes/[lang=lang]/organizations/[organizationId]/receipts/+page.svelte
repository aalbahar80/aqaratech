<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import type { LeaseInvoiceDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import DateFilter from '$lib/components/dashboard/filter/DateFilter.svelte';
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import PieCharts from '$lib/components/leaseInvoice/PieCharts.svelte';
	import { portfolioColumnDef } from '$lib/components/table/tanstack-table/columns/portfolio';
	import { isPaidOnlineFilter } from '$lib/components/table/tanstack-table/filters/is-paid-online';
	import { payPhaseFilter } from '$lib/components/table/tanstack-table/filters/pay-phase';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseInvoiceDto>();
</script>

<div
	class="grid h-full grid-cols-2 gap-8 gap-x-2 rounded-lg bg-white p-8 shadow md:gap-8"
>
	<div class="col-span-full">
		<DateFilter />
	</div>
</div>

<PieCharts
	aggregate={data.invoices.aggregate}
	visibility={{
		paymentStatusPie: false,
		paymentTimePie: true,
		dueStatusPie: false,
	}}
/>

<LeaseInvoiceTable
	data={data.invoices}
	extraFilters={[$isPaidOnlineFilter, $payPhaseFilter]}
	sorting={[
		// keep in sync with receipt link in nav tree
		{
			id: 'paidAt',
			desc: false,
		},
	]}
	extraColumns={[
		portfolioColumnDef(columnHelper),
		{
			id: 'lease.tenant.fullName', // used for sorting
			header: $L.entity.tenant.singular(),
			accessorKey: 'breadcrumbs.tenant.label', // used for display
		},
	]}
/>
