<script lang="ts" context="module">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import LeaseHeading from '$lib/components/lease/LeaseHeading.svelte';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, stuff }) => {
		if (params.id === 'add') return { fallthrough: true };

		const lease = await trpc.query('leases:read', params.id);
		if (lease) return { props: { lease }, stuff: { lease } };

		return { error: 'Lease not found', status: 404 };
	};
</script>

<script lang="ts">
	type Lease = NonNullable<InferQueryOutput<'leases:read'>>;
	export let lease: Lease;
</script>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<LeaseHeading {lease} />
	<slot />
</div>
