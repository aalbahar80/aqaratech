<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import { logger } from '$lib/config/logger';
	import type { Prisma, Tenant } from '@prisma/client';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, url }) => {
		const newUrl = `${url.pathname}.json${url.search}`;
		const res = await fetch(newUrl);
		const data = await res.json();
		return {
			props: data,
			maxage: 60,
		};
	};
</script>

<script lang="ts">
	export let rows: Tenant[];
	const newTenant: Prisma.TenantCreateInput = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		// dob: '',
		civilid: '',
	};
</script>

<svelte:head>
	<title>Tenants</title>
</svelte:head>

<TableParent {rows} defaultFormData={newTenant} endpointName={'tenants'}>
	<!-- <svelte:fragment slot="headerRowP">
		{@const fullName = 'Full Name'}
		<th scope="col" class="table__header">
			{startCase(fullName)}
		</th>
		{#each Object.entries(rows[0]) as [headerCell] (headerCell)}
			<th scope="col" class="table__header">
				{startCase(headerCell)}
			</th>
		{/each}
	</svelte:fragment>
	<svelte:fragment slot="row" let:fullRow>
		{@const fullName = join([fullRow.firstName, fullRow.lastName], ' ')}
		<td class="table__cell--name">{fullName}</td>
		{#each Object.entries(fullRow) as [field, value] (field)}
			<td class="table__cell">{value}</td>
		{/each}
	</svelte:fragment> -->
</TableParent>
