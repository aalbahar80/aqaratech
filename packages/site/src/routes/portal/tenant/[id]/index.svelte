<script lang="ts" context="module">
	import Select from '$lib/components/Select.svelte';
	import TrxList from '$lib/components/trx/TrxList.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const [leases, invoices] = await Promise.all([
			stuff.api!.tenants.findLeases({ id: params.id, take: 50 }),
			stuff.api!.tenants.findInvoices({ id: params.id, take: 1000 }),
		]);

		return { props: { leases, invoices } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let leases: Prop['leases'];
	export let invoices: Prop['invoices'];

	const options = leases.results.map((lease, idx) => ({
		value: lease.id,
		label: `Lease #${leases.results.length - idx}: ${toUTCFormat(
			lease.start,
		)} - ${toUTCFormat(lease.end)}`,
	}));

	let selected = options[0]?.value;
	$: filtered = invoices.results.filter(
		(invoice) => invoice.leaseId === selected,
	);
</script>

<TrxList invoices={filtered}>
	<Select
		disabled={leases.results.length < 2}
		{options}
		bind:current={selected}
	/>
</TrxList>
