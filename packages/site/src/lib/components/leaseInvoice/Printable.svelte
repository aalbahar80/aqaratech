<script lang="ts">
	import { createPDF } from '$lib/components/leaseInvoice/invoice-to-pdf';
	import type { LeaseInvoiceDto } from '@self/sdk';

	export let invoice: LeaseInvoiceDto;
</script>

<button on:click={() => createPDF({ invoice, outputType: 'dataurlnewwindow' })}
	>Print me</button
>
