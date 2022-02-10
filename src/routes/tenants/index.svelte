<script context="module" lang="ts">
	import TableParent from '$components/table/TableParent.svelte';
	import type { Prisma, Tenant } from '@prisma/client';
	import type { Load } from '@sveltejs/kit';
	import { formSchema } from '$lib/definitions/Tenants';

	export const load: Load = async ({ fetch, url }) => {
		const newUrl = `${url.pathname}.json${url.search}`;
		const res = await fetch(newUrl);
		const data = await res.json();
		return {
			props: data,
		};
	};
</script>

<script lang="ts">
	export let rows: Tenant[];
	const newTenant: Prisma.TenantCreateInput = {
		firstName: undefined,
		lastName: '',
		phone: undefined,
		email: undefined,
		dob: undefined,
		civilid: undefined,
	};
</script>

<svelte:head>
	<title>Tenants</title>
</svelte:head>

<TableParent
	{rows}
	defaultFormData={newTenant}
	endpointName={'tenants'}
	{formSchema}
/>
