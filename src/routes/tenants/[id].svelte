<script context="module" lang="ts">
	export const prerender = true;
	import { TenantsByIdLocalDocument } from './_[id].gql';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, stuff, fetch }) => {
		const id = page.params.id;
		if (id === 'add') {
			return;
		} else {
			return {
				props: {
					tenant: await stuff.query(TenantsByIdLocalDocument, {
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
	import { OperationStore, operationStore, query } from '@urql/svelte';
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
	import Link from 'carbon-components-svelte/src/Link/Link.svelte';
	import { ArrowRight16, ArrowLeft16 } from 'carbon-icons-svelte';
	import type { TenantsByIdLocalQuery } from '$generated/graphql';

	export let tenant;

	query(tenant);
	$: result = $tenant?.data?.tenants_by_pk;
</script>

<div
	class="grid grid-cols-1 lg:grid-cols-2 gap-4 space-y-4 max-w-screen-2xl items-baseline"
>
	{#if $tenant.fetching}
		<p>Loading...</p>
	{:else if $tenant.error}
		<p>Error: {$tenant.error.message}</p>
	{:else}
		<TenantBreadcrumbs />
		<div class="flex flex-col items-end">
			<Link
				href={`/${$page.path.split('/')[1]}/${parseInt($page.params.id) - 1}`}
				sveltekit:prefetch
			>
				<span class="pr-2">Previous</span>
				<ArrowLeft16 />
			</Link>
			<Link
				href={`/${$page.path.split('/')[1]}/${parseInt($page.params.id) + 1}`}
				sveltekit:prefetch
			>
				<span class="pr-2">Next</span>
				<ArrowRight16 />
			</Link>
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
