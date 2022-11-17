<script lang="ts">
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import * as R from 'remeda';
	import type { PageData } from './$types';

	export let data: PageData;

	$: obj = R.merge(data.leaseInvoice, {
		tenant: data.leaseInvoice.breadcrumbs.tenant.label,
		property: data.leaseInvoice.breadcrumbs.property.label,
		unit: data.leaseInvoice.breadcrumbs.unit.label,
	});
</script>

<AutoDetailsPane
	details={obj}
	keys={[
		'amount',
		'memo',
		'postAt',
		'dueAt',
		'paidAt',
		'tenant',
		'property',
		'unit',
	]}
/>
