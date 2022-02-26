<script lang="ts" context="module">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import LeaseDetail from '$lib/components/lease/LeaseDetail.svelte';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };

		const lease = await trpc.query('leases:read', params.id);
		if (lease) return { props: { lease } };

		return { error: 'Lease not found', status: 404 };
	};
</script>

<script lang="ts">
	type Lease = NonNullable<InferQueryOutput<'leases:read'>>;
	export let lease: Lease;
</script>

<LeaseDetail {lease} />
