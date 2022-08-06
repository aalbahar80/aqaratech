<script lang="ts">
	import { browser } from '$app/env';
	import { invoiceToPdf } from '$lib/components/leaseInvoice/invoice-to-pdf';
	import type { LeaseInvoiceDto } from '@self/sdk';
	import type jsPDFInvoiceTemplate from 'jspdf-invoice-template';
	import { onMount } from 'svelte';

	export let invoice: LeaseInvoiceDto;

	let pdfPkg: typeof jsPDFInvoiceTemplate | undefined;
	onMount(async () => {
		pdfPkg = (await import('jspdf-invoice-template')).default;
	});
</script>

<button on:click={() => browser && pdfPkg && pdfPkg(invoiceToPdf(invoice))}
	>Print me</button
>
