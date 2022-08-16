<script lang="ts" context="module">
	import InvoiceForm from '$lib/components/leaseInvoice/InvoiceForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const invoice = await stuff.api!.leaseInvoices.findOne({ id: params.id });

		return { props: { invoice } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let invoice: Prop['invoice'];
</script>

<InvoiceForm formType="update" data={invoice} />
