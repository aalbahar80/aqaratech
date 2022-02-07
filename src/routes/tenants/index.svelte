<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import type { Prisma, Tenant } from '@prisma/client';
	import type { Load } from '@sveltejs/kit';
	import join from 'lodash-es/join.js';
	import startCase from 'lodash-es/startCase.js';

	export const load: Load = ({ props }) => ({
		props,
	});
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

<style lang="postcss">
	.table__header {
		@apply px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500;
	}
	.table__cell {
		@apply whitespace-nowrap px-6 py-4 text-sm text-gray-500;
	}
	.table__cell--name {
		@apply whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900;
	}
</style>
