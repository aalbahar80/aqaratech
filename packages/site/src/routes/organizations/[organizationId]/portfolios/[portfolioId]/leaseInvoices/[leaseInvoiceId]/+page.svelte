<script lang="ts">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;

	$: details = [
		['Post Date', toUTCFormat(data.leaseInvoice.postAt)],
		[
			'Due Date',
			data.leaseInvoice.dueAt ? toUTCFormat(data.leaseInvoice.dueAt) : null,
		],
		['Amount', kwdFormat(data.leaseInvoice.amount)],
		['Memo', data.leaseInvoice.memo || '-'],
		['Address', data.leaseInvoice.breadcrumbs.property.label],
		['Unit', data.leaseInvoice.breadcrumbs.unit.label],
	] as [string, string | null][];
</script>

<DetailsPane {details} />
