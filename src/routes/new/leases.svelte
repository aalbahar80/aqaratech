<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => {
		const predefined = Object.fromEntries(url.searchParams.entries());

		if (predefined.renew && predefined.leaseId) {
			const oldLease = await trpc.query('leases:read', predefined.leaseId);
			return { props: { oldLease } };
		}
		return {};
	};
</script>

<script lang="ts">
	import LeaseForm from '$lib/components/lease/LeaseForm.svelte';
	import { singular } from '$lib/definitions/index';
	import trpc from '$lib/client/trpc';

	export let oldLease: any;
	const entity = 'leases';
</script>

<svelte:head>
	<title>{`New ${singular[entity]}`}</title>
</svelte:head>
<!-- <pre>{JSON.stringify(oldLease, null, 2)}</pre> -->
<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="min-w-0 flex-1">
		<h2
			class="pb-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:pb-6 sm:text-3xl"
		>
			New Lease
		</h2>
	</div>
	<LeaseForm {oldLease} />
</div>
