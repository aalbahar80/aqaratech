<script lang="ts" context="module">
	import LeasesCard from '$components/tenant/LeasesCard.svelte';
	import TenantDetail from '$components/tenant/TenantDetail.svelte';
	import TrxColumn from '$components/tenant/TrxColumn.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import LeaseDetail from '$lib/components/lease/LeaseDetail.svelte';
	import FModalDelete from '$lib/components/toast/FModalDelete.svelte';
	import type { Load } from '@sveltejs/kit';
	import flatten from 'lodash-es/flatten.js';
	import map from 'lodash-es/map.js';

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
	let isOpen = false;

	const handleOpenModal = () => {
		isOpen = true;
	};
</script>

<!-- <FModalDelete id={lease.id} entity="leases" bind:isOpen /> -->
<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<LeaseDetail {lease} on:openDeleteModal={handleOpenModal} />
</div>
