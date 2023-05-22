<script lang="ts">
	import type { PageData } from './$types';

	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import { isPaidFilter } from '$lib/components/table/tanstack-table/filters/is-paid';
	import { isPaidOnlineFilter } from '$lib/components/table/tanstack-table/filters/is-paid-online';
	import { payPhaseFilter } from '$lib/components/table/tanstack-table/filters/pay-phase';

	export let data: PageData;
</script>

<LeaseInvoiceTable
	data={data.invoices}
	extraFilters={[$isPaidFilter, $isPaidOnlineFilter, $payPhaseFilter]}
/>
