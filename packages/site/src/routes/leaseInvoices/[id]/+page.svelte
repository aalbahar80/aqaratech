<script lang="ts">
	import LeaseInvoicePage from '$lib/components/leaseInvoice/LeaseInvoicePage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<LeaseInvoicePage trx={data.leaseInvoice} />
