<script context="module" lang="ts">
	import { page } from '$app/stores';
	import ActionPanel from '$components/ActionPanel.svelte';
	import NextPrev from '$components/breadcrumbs/NextPrev.svelte';
	import TenantBreadcrumbs from '$components/breadcrumbs/TenantBreadcrumbs.svelte';
	import LeaseAccordion from '$components/LeaseAccordion.svelte';
	import RecentTrx from '$components/tenant/RecentTrx.svelte';
	import {
		DeleteTenantDocument,
		TenantsByIdLocalDocument,
		TenantsByIdLocalStore,
	} from '$generated/graphql';
	import {
		faBirthdayCake,
		faEnvelope,
		faIdCard,
		faPhone,
		faUserCircle,
	} from '@fortawesome/free-solid-svg-icons';
	import type { Load } from '@sveltejs/kit';
	import { query } from '@urql/svelte';
	import { formatDistanceToNow, formatRelative } from 'date-fns';
	import isEmpty from 'just-is-empty';
	import Fa from 'svelte-fa/src/fa.svelte';

	export const prerender = true;

	export const load: Load = async ({ params, stuff }) => {
		const id = params.id;
		// debugger;
		if (id === 'add') return;

		const tenant = await stuff.query(TenantsByIdLocalDocument, {
			id,
			with_crumbs: true,
			with_past_leases: true,
		});

		if (tenant.data?.tenants_by_pk) {
			return {
				props: {
					tenant: await stuff.query(TenantsByIdLocalDocument, {
						id,
						with_crumbs: true,
						with_past_leases: true,
					}),
					id,
				},
			};
		}

		return { status: 404 };
	};
</script>

<script lang="ts">
	export let tenant: TenantsByIdLocalStore;
	$: id = $page.params.id;

	query(tenant);
	$: result = $tenant?.data?.tenants_by_pk;
</script>

<div
	class="grid grid-cols-1 lg:grid-cols-1 gap-4 space-y-4 max-w-screen-2xl items-baseline"
>
	{#if $tenant.fetching}
		<p>Loading...</p>
	{:else if $tenant.error}
		<p>Error: {$tenant.error.message}</p>
	{:else if $tenant.data?.tenants_by_pk}
		<TenantBreadcrumbs />
		<NextPrev {id} path={$page.url.pathname.split('/')[1]} />
		<ActionPanel {id} deleteDocumentNode={DeleteTenantDocument} />
		<div
			class="grid items-center flex-grow grid-cols-2 p-8 card bg-base-200 rounded-box gap-y-8"
		>
			<Fa class="" icon={faUserCircle} />
			<p class="text-3xl">
				{`${result?.first_name} ${result?.last_name}`}
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
		<LeaseAccordion />
	{/if}
</div>
