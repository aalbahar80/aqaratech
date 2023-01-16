<script lang="ts">
	import type { PageData } from './$types';

	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import { isPaidFilter } from '$lib/components/table/tanstack-table/filters/is-paid';

	export let data: PageData;
</script>

<LeaseInvoiceTable data={data.invoices} extraFilters={[$isPaidFilter]} />
