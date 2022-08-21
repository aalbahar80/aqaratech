<script lang="ts">
	import Select from '$lib/components/form/inputs/Select.svelte';
	import TrxList from '$lib/components/trx/TrxList.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;

	const options = data.leases.results.map((lease, idx) => ({
		value: lease.id,
		label: `Lease #${data.leases.results.length - idx}: ${toUTCFormat(
			lease.start,
		)} - ${toUTCFormat(lease.end)}`,
	}));

	let selected = options[0]?.value;
	$: filtered = data.invoices.results.filter(
		(invoice) => invoice.leaseId === selected,
	);
</script>

<TrxList invoices={filtered}>
	<Select
		disabled={data.leases.results.length < 2}
		{options}
		bind:current={selected}
	/>
</TrxList>
