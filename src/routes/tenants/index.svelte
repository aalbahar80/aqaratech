<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import { endpointBase, endpointPatch } from '$lib/config/constants';
	import type { Prisma, Tenant } from '@prisma/client';
	import type { Load } from '@sveltejs/kit';

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

<TableParent {rows} defaultFormData={newTenant} />
