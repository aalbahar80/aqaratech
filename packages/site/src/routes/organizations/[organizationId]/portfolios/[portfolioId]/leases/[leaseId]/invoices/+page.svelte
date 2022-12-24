<script lang="ts">
	import type { PageData } from './$types';

	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';

	export let data: PageData;
</script>

<LeaseInvoiceTable data={data.invoices} />
