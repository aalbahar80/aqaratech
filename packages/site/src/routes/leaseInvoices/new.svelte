<script context="module" lang="ts">
	import InvoiceForm from '$lib/components/leaseInvoice/InvoiceForm.svelte';
	import type { PredefinedInvoice } from '$lib/models/interfaces/predefined.interface';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url }: LoadEvent) => {
		const predefined: PredefinedInvoice = {
			leaseId: url.searchParams.get('leaseId'),
		};

		return { props: { predefined } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let predefined: Prop['predefined'];
</script>

<InvoiceForm formType="create" {predefined} />
