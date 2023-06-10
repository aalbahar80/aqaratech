<script lang="ts">
	import type { LeaseInvoicePublicDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import { fmtCurrency } from '$lib/i18n/format';

	export let leaseInvoice: LeaseInvoicePublicDto;

	const details = {
		invoice: {
			id: leaseInvoice.id,
			amount: fmtCurrency(leaseInvoice.amount),
			memo: leaseInvoice.memo,
			postAt: leaseInvoice.postAt,
			// dueAt: leaseInvoice.dueAt,
		},
		payment: {
			isPaid: leaseInvoice.isPaid,
			paidAt: leaseInvoice.paidAt,
		},
	};
</script>

<h3 class="ps-1 text-lg font-semibold text-gray-700">
	{$L.general.invoiceDetails()}
</h3>
<AutoDetailsPane
	details={details.invoice}
	fieldLabels={{
		id: $L.other.invoiceId(),
	}}
/>

<h3 class="ps-1 text-lg font-semibold text-gray-700">
	{$L.general.paymentDetails()}
</h3>
<AutoDetailsPane
	details={details.payment}
	fieldLabels={{
		isPaid: $L.general.paymentComplete(),
	}}
/>
