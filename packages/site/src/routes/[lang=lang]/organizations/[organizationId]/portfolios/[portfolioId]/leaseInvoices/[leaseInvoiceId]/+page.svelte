<script lang="ts">
	import * as R from 'remeda';

	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import L from '$i18n/i18n-svelte';
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';

	export let data: PageData;

	$: obj = R.merge(data.leaseInvoice, {
		tenant: data.leaseInvoice.breadcrumbs.tenant.label,
		property: data.leaseInvoice.breadcrumbs.property.label,
		unit: data.leaseInvoice.breadcrumbs.unit.label,
	});

	const ALL_KEYS = [
		'amount',
		'memo',
		'isPaid',
		'postAt',
		'dueAt',
		'paidAt',
		'tenant',
		'property',
		'unit',
		'id',
		'mfPaymentId',
	] as const;

	$: keys =
		$page.data.user?.role?.roleType === 'TENANT'
			? ALL_KEYS.filter(
					(key) => !['isPaid', 'dueAt', 'memo', 'mfPaymentId'].includes(key),
			  )
			: ALL_KEYS;
</script>

<AutoDetailsPane
	details={obj}
	{keys}
	fieldLabels={{
		id: $L.other.invoiceId(),
	}}
/>
