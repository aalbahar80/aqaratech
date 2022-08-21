<script lang="ts">
	import InvoiceForm from '$lib/components/leaseInvoice/InvoiceForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<InvoiceForm formType="create" predefined={data.predefined} />
