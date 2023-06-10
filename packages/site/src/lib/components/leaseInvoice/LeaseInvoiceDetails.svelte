<script lang="ts">
	import * as R from 'remeda';

	import { page } from '$app/stores';
	import { EMPTY_VALUE } from '@self/utils';

	import type { LeaseInvoiceDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import { fmtCurrency } from '$lib/i18n/format';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';

	export let leaseInvoice: LeaseInvoiceDto;

	const paymentGatewayRaw = R.pathOr(
		leaseInvoice,
		// @ts-expect-error mfData json is untyped
		['mfData', 'Data', 'InvoiceTransactions', 0, 'PaymentGateway'],
		'',
	);
	const paymentGateway =
		typeof paymentGatewayRaw === 'string' ? paymentGatewayRaw : '';

	const paymentProvider = leaseInvoice.mfPaymentId ? 'MyFatoorah' : '';

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
			paymentMethod: leaseInvoice.isPaid
				? [paymentGateway, paymentProvider].filter(Boolean).join(' - ') ||
				  EMPTY_VALUE
				: EMPTY_VALUE,
			mfPaymentId: leaseInvoice.mfPaymentId,
		},
		related: {
			tenant: leaseInvoice.breadcrumbs.tenant.label,
			property: leaseInvoice.breadcrumbs.property.label,
			unit: leaseInvoice.breadcrumbs.unit.label,
			organization: $page.data.user.role?.organization.fullName,
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
		paymentMethod: $L.general.paymentMethod(),
		mfPaymentId: getIntlLabel('mfPaymentId', false),
	}}
/>

<h3 class="ps-1 text-lg font-semibold text-gray-700">
	{$L.general.relatedDetails()}
</h3>
<AutoDetailsPane
	details={details.related}
	fieldLabels={{
		organization: $L.general.propertyManager(),
		tenant: $L.entity.tenant.singular(),
	}}
/>
