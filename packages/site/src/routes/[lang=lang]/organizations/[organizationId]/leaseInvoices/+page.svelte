<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import type { LeaseInvoiceDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import DateFilter from '$lib/components/dashboard/filter/DateFilter.svelte';
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import { portfolioColumnDef } from '$lib/components/table/tanstack-table/columns/portfolio';
	import { isPaidFilter } from '$lib/components/table/tanstack-table/filters/is-paid';
	import { isPaidLateFilter } from '$lib/components/table/tanstack-table/filters/is-paid-late';
	import { isPaidOnlineFilter } from '$lib/components/table/tanstack-table/filters/is-paid-online';

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

<LeaseInvoiceTable
	data={data.invoices}
	extraFilters={[$isPaidFilter, $isPaidOnlineFilter, $isPaidLateFilter]}
	extraColumns={[
		portfolioColumnDef(columnHelper),
		{
			id: 'lease.tenant.fullName', // used for sorting
			header: $L.entity.tenant.singular(),
			accessorKey: 'breadcrumbs.tenant.label', // used for display
		},
	]}
/>
