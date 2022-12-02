<script lang="ts">
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<LeaseInvoiceTable data={data.invoices} />
