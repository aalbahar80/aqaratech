<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import type { LeaseInvoiceDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import { isPaidFilter } from '$lib/components/table/tanstack-table/filters/is-paid';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseInvoiceDto>();
</script>

<LeaseInvoiceTable
	data={data.invoices}
	extraFilters={[$isPaidFilter]}
	extraColumns={[
		columnHelper.accessor('portfolioId', {
			header: $L.entity.portfolio.singular(),
			cell: (info) => info.row.original.breadcrumbs.portfolio.label,
		}),
	]}
/>
