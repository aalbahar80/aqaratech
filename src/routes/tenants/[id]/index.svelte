<script lang="ts" context="module">
	import LeasesCard from '$components/tenant/LeasesCard.svelte';
	import TenantDetail from '$components/tenant/TenantDetail.svelte';
	import TrxColumn from '$components/tenant/TrxColumn.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import FModalDelete from '$lib/components/toast/FModalDelete.svelte';
	import type { Load } from '@sveltejs/kit';
	import flatten from 'lodash-es/flatten.js';
	import map from 'lodash-es/map.js';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };

		const tenant = await trpc.query('tenants:read', params.id);
		if (tenant) return { props: { tenant } };

		return { error: 'Tenant not found', status: 404 };
	};
</script>

<script lang="ts">
	type Tenant = NonNullable<InferQueryOutput<'tenants:read'>>;
	export let tenant: Tenant;
	let isOpen = false;

	const handleOpenModal = () => {
		isOpen = true;
	};
</script>

<FModalDelete id={tenant.id} bind:isOpen />
<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<TenantDetail {tenant} on:openDeleteModal={handleOpenModal} />
	<LeasesCard leases={tenant.leases} tenantId={tenant.id} />
	<TrxColumn transactions={flatten(map(tenant.leases, 'transactions'))} />
</div>
