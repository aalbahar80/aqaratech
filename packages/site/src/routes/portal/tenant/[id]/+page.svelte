<script lang="ts">
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- <pre>{JSON.stringify(data.invoices, null, 2)}</pre> -->
<!-- <LeaseInvoiceTable data={data.invoices} /> -->
