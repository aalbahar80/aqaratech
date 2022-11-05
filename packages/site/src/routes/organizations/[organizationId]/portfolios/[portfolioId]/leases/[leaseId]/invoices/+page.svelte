<script lang="ts">
	import LeaseInvoiceList from '$lib/components/leaseInvoice/LeaseInvoiceList.svelte';
	import type { PageData } from './types';

	export let data: PageData;
</script>

<LeaseInvoiceList leaseInvoices={data.leaseInvoices} leaseId={data.lease.id} />
