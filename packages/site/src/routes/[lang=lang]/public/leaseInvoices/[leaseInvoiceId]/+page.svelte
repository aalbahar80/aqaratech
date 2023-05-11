<script lang="ts">
	import { page } from '$app/stores';

	import L from '$i18n/i18n-svelte';
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Contact from '$lib/components/landing/Contact.svelte';
	import { getInvoiceBadge } from '$lib/utils/get-badge';

	export let data;

	$: badge = getInvoiceBadge(data.leaseInvoice);
</script>

{#if data.leaseInvoice.isPaid}
	<p
		data-testid="invoice-success-message"
		class="ps-1 font-medium tracking-tight text-gray-700"
	>
		{$L.misc.invoiceSuccess()}
	</p>
{/if}

<Badge
	label={badge.label}
	badgeColor={badge.color}
/>

<AutoDetailsPane
	details={data.leaseInvoice}
	keys={['amount', 'postAt', 'paidAt', 'id']}
	fieldLabels={{
		// FIX: i18n
		id: 'Invoice ID',
	}}
/>

{#if data.leaseInvoice.isPaid && !$page.data.user}
	<p
		data-testid="tenant-login-message"
		class="ps-1 font-medium tracking-tight text-gray-700"
	>
		{$L.misc.tenantLogin()}
	</p>
{/if}

<Contact />
