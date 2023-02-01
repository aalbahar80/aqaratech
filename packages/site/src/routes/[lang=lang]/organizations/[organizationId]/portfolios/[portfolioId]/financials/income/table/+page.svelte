<script lang="ts">
	import type { PageData } from './$types';

	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import { isPaidFilter } from '$lib/components/table/tanstack-table/filters/is-paid';
	import { isPaidLateFilter } from '$lib/components/table/tanstack-table/filters/is-paid-late';
	import { isPaidOnlineFilter } from '$lib/components/table/tanstack-table/filters/is-paid-online';

	export let data: PageData;
</script>

<!-- TODO rm showOptions and define column here instead -->
<LeaseInvoiceTable
	data={data.invoices}
	extraFilters={[$isPaidFilter, $isPaidOnlineFilter, $isPaidLateFilter]}
	showOptions
/>
