<script lang="ts">
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Contact from '$lib/components/landing/Contact.svelte';
	import { getInvoiceBadge } from '$lib/utils/get-badge';

	export let data;

	$: badge = getInvoiceBadge(data.leaseInvoice);
</script>

<Badge
	label={badge.label}
	badgeColor={badge.color}
/>

<AutoDetailsPane
	details={data.leaseInvoice}
	keys={['amount', 'postAt', 'paidAt', 'id']}
/>

<Contact />
