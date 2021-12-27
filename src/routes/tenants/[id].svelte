<script context="module" lang="ts">
	export const prerender = true;
	import * as gql from './_[id].gql';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, stuff, fetch }) => {
		const id = page.params.id;
		if (id === 'add') {
			return;
		} else {
			return {
				props: {
					tenant: await stuff.query(gql.TenantsByIdLocalDocument, {
						id,
						with_crumbs: true,
						with_past_leases: false,
					}),
					id,
				},
			};
		}
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { operationStore, query } from '@urql/svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	// import type { TenantsByIdLocalDocument } from './_[id].gql';
	import {
		faUserCircle,
		faEnvelope,
		faPhone,
		faIdCard,
		faBirthdayCake,
		faPen,
	} from '@fortawesome/free-solid-svg-icons';
	import { formatDateDiff, omit } from '$lib/utils';
	import { formatDistanceToNow, formatRelative, parse } from 'date-fns';
	import TenantBreadcrumbs from '$components/breadcrumbs/TenantBreadcrumbs.svelte';
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	import LeaseAccordion from '$components/LeaseAccordion.svelte';
	export let tenant;

	query(tenant);
	$: result = $tenant?.data?.tenants_by_pk;
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 space-y-4 max-w-screen-2xl">
	{#if $tenant.fetching}
		<p>Loading...</p>
	{:else if $tenant.error}
		<p>Error: {$tenant.error.message}</p>
	{:else}
		<div class="col-span-full">
			<TenantBreadcrumbs />
		</div>
		<div
			class="grid items-center flex-grow grid-cols-2 p-8 card bg-base-200 rounded-box gap-y-8"
		>
			<Fa class="" icon={faUserCircle} />
			<p class="text-3xl">
				{`${result.first_name} ${result.last_name}`}
			</p>
			<Fa icon={faEnvelope} />
			<p>{result.email}</p>
			<Fa icon={faPhone} />
			<p>{result.phone}</p>
			<Fa icon={faBirthdayCake} />
			<p>{result.dob}</p>
			<Fa icon={faIdCard} />
			<p>{result.civilid}</p>
			<p>Registered</p>
			<p>
				{formatDistanceToNow(new Date('2021-01-01'), { addSuffix: true })}
			</p>
			<p>Last Seen</p>
			<p>
				{formatRelative(new Date('2021-12-08'), new Date())}
			</p>
		</div>

		<div class="grid flex-grow grid-cols-3 p-8 card bg-base-200 rounded-box">
			Transactions
		</div>
		<LeaseAccordion />
	{/if}
</div>
