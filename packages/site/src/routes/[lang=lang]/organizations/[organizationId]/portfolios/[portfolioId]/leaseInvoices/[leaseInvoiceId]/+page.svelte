<script lang="ts">
	import type { PageData } from './$types';

	import LeaseInvoiceDetails from '$lib/components/leaseInvoice/LeaseInvoiceDetails.svelte';

	export let data: PageData;
</script>

<LeaseInvoiceDetails leaseInvoice={data.leaseInvoice} />
