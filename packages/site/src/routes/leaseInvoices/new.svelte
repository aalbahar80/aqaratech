<script context="module" lang="ts">
	import InvoiceForm from '$lib/components/leaseInvoice/InvoiceForm.svelte';
	import type { PredefinedInvoice } from '$lib/models/interfaces/predefined.interface';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url, stuff }: LoadEvent) => {
		const leaseId = url.searchParams.get('leaseId');

		if (!leaseId) {
			throw new Error('No leaseId provided');
		}

		const lease = await stuff.api!.leases.findOne({ id: leaseId });
		const predefined: PredefinedInvoice = {
			leaseId: lease.id,
			portfolioId: lease.portfolioId,
		};

		return { props: { predefined } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let predefined: Prop['predefined'];
</script>

<InvoiceForm formType="create" {predefined} />
