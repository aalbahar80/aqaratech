<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import type { LeaseInvoiceDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import DateFilter from '$lib/components/dashboard/filter/DateFilter.svelte';
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import PieCharts from '$lib/components/leaseInvoice/PieCharts.svelte';
	import { portfolioColumnDef } from '$lib/components/table/tanstack-table/columns/portfolio';
	import { isPaidFilter } from '$lib/components/table/tanstack-table/filters/is-paid';
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

<div class="flex flex-col gap-4 sm:flex-row">
	<PieCharts aggregate={data.invoices.aggregate} />
</div>

<LeaseInvoiceTable
	data={data.invoices}
	extraFilters={[$isPaidFilter, $isPaidOnlineFilter, $payPhaseFilter]}
	extraColumns={[
		portfolioColumnDef(columnHelper),
		{
			id: 'lease.tenant.fullName', // used for sorting
			header: $L.entity.tenant.singular(),
			accessorKey: 'breadcrumbs.tenant.label', // used for display
		},
	]}
	columnVisibility={{
		paidAt: false,
	}}
/>
