<script lang="ts" context="module">
	import LeaseInvoicePage from '$lib/components/leaseInvoice/LeaseInvoicePage.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const [leaseInvoice] = await Promise.all([
			stuff.api!.leaseInvoices.findOne({
				id: params.id,
			}),
		]);

		return { props: { leaseInvoice } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let leaseInvoice: Prop['leaseInvoice'];
</script>

<LeaseInvoicePage trx={leaseInvoice} />
