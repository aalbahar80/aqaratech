<script lang="ts">
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- TODO rm showOptions and define column here instead -->
<LeaseInvoiceTable data={data.invoices} showOptions />
