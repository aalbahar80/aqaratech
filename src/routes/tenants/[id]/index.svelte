<script context="module" lang="ts">
	import { page } from '$app/stores';
	import ActionPanel from '$components/ActionPanel.svelte';
	import BreadCrumbs from '$components/breadcrumbs/BreadCrumbs.svelte';
	import NextPrev from '$components/breadcrumbs/NextPrev.svelte';
	import LeaseAccordion from '$components/LeaseAccordion.svelte';
	import RecentTrx from '$components/tenant/RecentTrx.svelte';
	import type { Load } from '@sveltejs/kit';
	import { formatDistanceToNow, formatRelative } from 'date-fns';
	import isEmpty from 'just-is-empty';

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;

		const tenant: TenantIdScreenStore = await stuff.query(
			TenantIdScreenDocument,
			{
				id,
			},
		);

		return {
			props: {
				tenant,
			},
		};
	};
</script>

<script lang="ts">
	export let tenant: TenantIdScreenStore;
	$: id = $page.params.id;

	query(tenant);
	$: result = $tenant?.data?.tenants_by_pk;

	$: crumbs = {
		tenant: $tenant.data?.tenants_by_pk?.id,
		lease: $tenant.data?.tenants_by_pk?.leases[0]?.id,
		unit: $tenant.data?.tenants_by_pk?.leases[0]?.unit?.id,
		property: $tenant.data?.tenants_by_pk?.leases[0]?.unit?.property?.id,
		client: $tenant.data?.tenants_by_pk?.leases[0]?.unit?.property?.client?.id,
	};
</script>

<div
	class="grid max-w-screen-2xl grid-cols-1 items-baseline gap-4 space-y-4 lg:grid-cols-1"
>
	{#if $tenant.error}
		<p>Error: {$tenant.error.message}</p>
	{:else if $tenant.data?.tenants_by_pk}
		<BreadCrumbs {crumbs} />
		<NextPrev {id} path={$page.url.pathname.split('/')[1]} />
		<ActionPanel {id} deleteDocumentNode={DeleteTenantDocument}>
			<svelte:fragment slot="row2">
				<Button
					kind="tertiary"
					iconDescription={'Create new lease'}
					icon={DocumentAdd32}
				/>
			</svelte:fragment>
		</ActionPanel>
		<div
			class="grid items-center flex-grow grid-cols-2 p-8 card bg-base-200 rounded-box gap-y-8"
		>
			<Fa class="" icon={faUserCircle} />
			<p class="text-3xl">
				{`${result?.first_name ?? ''} ${result?.last_name ?? ''}`}
			</p>
			<Fa icon={faEnvelope} />
			<p>{result?.email}</p>
			<Fa icon={faPhone} />
			<p>{result?.phone}</p>
			<Fa icon={faBirthdayCake} />
			<p>{result?.dob}</p>
			<Fa icon={faIdCard} />
			<p>{result?.civilid}</p>
			<p>Registered</p>
			<p>
				{formatDistanceToNow(new Date('2021-01-01'), { addSuffix: true })}
			</p>
			<p>Last Seen</p>
			<p>
				{formatRelative(new Date('2021-12-08'), new Date())}
			</p>
		</div>

		{#if !isEmpty($tenant.data?.transactions)}
			<RecentTrx trx={$tenant.data?.transactions} />
		{/if}
		<LeaseAccordion
			loading={$tenant.fetching}
			leases={$tenant.data.tenants_by_pk.pastLeases}
		/>
	{:else}
		<p>No tenant found</p>
	{/if}
</div>
