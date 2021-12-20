<script context="module" lang="ts">
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
						id
					}),
					id
				}
			};
		}
	};
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
	import { TenantsByIdDocument } from '$generated/graphql';
	import { operationStore, query } from '@urql/svelte';
	// import type { OperationStore } from 'src/global';
	import Fa from 'svelte-fa/src/fa.svelte';
	// import type { TenantsByIdLocalDocument } from './_[id].gql';
	import {
		faUserCircle,
		faEnvelope,
		faPhone,
		faIdCard,
		faBirthdayCake,
		faPen
	} from '@fortawesome/free-solid-svg-icons';
	import { formatDateDiff, omit } from '$lib/utils';
	import LeaseDropdown from '$components/LeaseDropdown.svelte';
	import { formatDistanceToNow, formatRelative, parse } from 'date-fns';
	import CrumbsTenant from '$components/breadcrumbs/CrumbsTenant.svelte';
	import { prefetch } from '$app/navigation';

	export let tenant;
	export let id;
	// const id = $page.params.id;
	// $: tenant.variables = {
	// 	id: parseInt(id)
	// };

	query(tenant);
	$: result = $tenant?.data?.tenants_by_pk;
	// $: crumbData = {
	// 	clientId:
	// 		$tenant?.data?.tenants_by_pk?.leases[0]?.unit?.property?.client?.id,
	// 	propertyId: $tenant?.data?.tenants_by_pk?.leases[0]?.unit?.property?.id,
	// 	unitId: $tenant?.data?.tenants_by_pk?.leases[0]?.unit?.id,
	// 	leaseId: $tenant?.data?.tenants_by_pk?.leases[0]?.id,
	// 	tenantId: $tenant?.data?.tenants_by_pk?.id
	// };
</script>

<!-- {#key id} -->
<div class="flex justify-center">
	<div class="grid grid-cols-2 gap-4 space-y-4 max-w-screen-2xl">
		{#if $tenant.fetching}
			<p>Loading...</p>
		{:else if $tenant.error}
			<p>Error: {$tenant.error.message}</p>
		{:else}
			<div class="col-span-full">
				<!-- <CrumbsTenant {id} /> -->
				<!-- <BreadCrumbs {...crumbData} /> -->
			</div>
			<div
				class="grid items-center flex-grow grid-cols-3 p-8 card bg-base-200 rounded-box gap-y-8"
			>
				<a href={`${$page.path}/edit`} class="col-start-3 btn btn-ghost btn-xs"
					><Fa class="pr-2" icon={faPen} />
					Edit</a
				>

				<Fa class="col-start-1" icon={faUserCircle} />
				<p dir="auto" class="col-span-2 text-3xl">
					{`${result.first_name} ${result.last_name}`}
				</p>
				<Fa icon={faEnvelope} />
				<p class="col-span-2">{result.email}</p>
				<Fa icon={faPhone} />
				<p class="col-span-2">{result.phone}</p>
				<Fa icon={faBirthdayCake} />
				<p class="col-span-2">{result.dob}</p>
				<Fa icon={faIdCard} />
				<p class="col-span-2">{result.civilid}</p>
				<div class="col-span-3 divider" />
				<Fa icon={faIdCard} />
				<p>Registered</p>
				<p>
					{formatDistanceToNow(new Date('2021-01-01'), { addSuffix: true })}
				</p>
				<Fa icon={faIdCard} />
				<p>Last Seen</p>
				<p>
					{formatRelative(new Date('2021-12-08'), new Date())}
				</p>
				<Fa icon={faIdCard} />
				<p>{result.civilid}</p>
				<p>{result.civilid}</p>
			</div>
			<!-- <div class="divider divider-vertical" /> -->

			<div class="grid flex-grow grid-cols-3 p-8 card bg-base-200 rounded-box">
				Transactions
			</div>

			<!-- <div class="grid mt-8 gap-y-4">
				{#each $tenant?.data?.tenants_by_pk?.leases as lease (lease.id)}
					<LeaseDropdown {lease} />
					<a href={`/sample/${lease.id}`}>side</a>
				{/each}
			</div> -->
		{/if}
	</div>
</div>
<!-- {/key} -->
