<script lang="ts" context="module">
	import LeaseInvoicePage from '$lib/components/leaseInvoice/LeaseInvoicePage.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const [leaseInvoice, files] = await Promise.all([
			stuff.api!.leaseInvoices.findOne({
				id: params.id,
			}),
			stuff.api!.files.findAll({
				relationKey: 'leaseInvoice',
				relationValue: params.id,
			}),
		]);

		return { props: { leaseInvoice, files } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let leaseInvoice: Prop['leaseInvoice'];
	export let files: Prop['files'];
</script>

<LeaseInvoicePage trx={leaseInvoice} {files} />
