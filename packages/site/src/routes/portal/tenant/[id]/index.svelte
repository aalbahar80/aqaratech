<script lang="ts" context="module">
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import Select from '$lib/components/Select.svelte';
	import TrxList from '$lib/components/trx/TrxList.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { Load } from './__types/index';

	export const load: Load = async ({ params, fetch }) => {
		const { id } = params;
		const leases = await trpc(fetch).query('tenant:leases:list', id);
		return { props: { leases } };
	};
</script>

<script lang="ts">
	export let leases: InferQueryOutput<'tenant:leases:list'>;

	const options = leases.map((lease, idx) => ({
		value: lease.id,
		label: `Lease #${leases.length - idx}: ${toUTCFormat(
			lease.start,
		)} - ${toUTCFormat(lease.end)}`,
	}));

	let selected = options[0]?.value;
	$: trxs = leases.find((lease) => lease.id === selected)?.transactions ?? [];
</script>

<TrxList {trxs}>
	<Select disabled={leases.length < 2} {options} bind:current={selected} />
</TrxList>
