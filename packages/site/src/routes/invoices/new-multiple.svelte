<script context="module" lang="ts">
	import Schedule from '$lib/components/lease/Schedule.svelte';
	import type { PredefinedInvoice } from '$lib/models/interfaces/predefined.interface';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url, stuff }: LoadEvent) => {
		const predefined: PredefinedInvoice = {
			leaseId: url.searchParams.get('leaseId'),
		};

		const lease = await stuff.api!.leases.findOne({ id: predefined.leaseId });
		return { props: { predefined, lease } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let lease: Prop['lease'];
</script>

<!-- <pre>{JSON.stringify(lease, null, 2)}</pre> -->

<Schedule {lease} />
