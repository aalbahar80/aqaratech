<script lang="ts" context="module">
	import LeasePage from '$lib/components/lease/LeasePage.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		url,
	}: LoadEvent<{ id: string }>) => {
		const { page, take } = parseParams(url);

		const [lease, invoices] = await Promise.all([
			stuff.api!.leases.findOne({ id: params.id }),
			stuff.api!.leases.findInvoices({ id: params.id, page, take }),
		]);

		return { props: { lease, invoices } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let lease: Prop['lease'];
	export let invoices: Prop['invoices'];
</script>

<LeasePage {lease} {invoices} />
