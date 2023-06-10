<script lang="ts">
	import { page } from '$app/stores';

	import L from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Contact from '$lib/components/landing/Contact.svelte';
	import LeaseInvoiceDetailsPublic from '$lib/components/leaseInvoice/LeaseInvoiceDetailsPublic.svelte';
	import { getInvoiceBadge } from '$lib/utils/get-badge';

	export let data;

	$: badge = getInvoiceBadge(data.leaseInvoice);
</script>

{#if data.leaseInvoice.isPaid}
	<p
		data-testid="invoice-success-message"
		class="ps-1 font-medium tracking-tight text-gray-700 print:hidden"
	>
		{$L.misc.invoiceSuccess()}
	</p>
{/if}

<Badge
	label={badge.label}
	badgeColor={badge.color}
/>

<LeaseInvoiceDetailsPublic leaseInvoice={data.leaseInvoice} />

{#if data.leaseInvoice.isPaid && !$page.data.user}
	<p
		data-testid="tenant-login-message"
		class="ps-1 font-medium tracking-tight text-gray-700 print:hidden"
	>
		{$L.misc.tenantLogin()}
	</p>
{/if}

<Contact />
