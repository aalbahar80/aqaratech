<script lang="ts">
	import type { PageData } from './$types';

	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';

	export let data: PageData;
</script>

<!-- TODO rm showOptions and define column here instead -->
<LeaseInvoiceTable data={data.invoices} showOptions />
