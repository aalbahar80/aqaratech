<script lang="ts">
	import { Breadcrumb } from 'carbon-components-svelte';
	import BreadcrumbItem from 'carbon-components-svelte/src/Breadcrumb/BreadcrumbItem.svelte';
	import Link from 'carbon-components-svelte/src/Link/Link.svelte';
	import { page } from '$app/stores';

	// TODO: remove defaults
	export let loading: boolean;
	export let clientId: number | undefined;
	export let propertyId: number | undefined;
	export let unitId: number | undefined;
	export let leaseId: number | undefined;
	export let tenantId: number | undefined;

	$: crumbs = [
		{
			name: 'clients',
			title: 'Client',
			href: `/clients/${clientId || ''}`,
			id: clientId,
		},
		{
			name: 'properties',
			title: 'Property',
			href: `/properties/${propertyId || ''}`,
			id: propertyId,
		},
		{
			name: 'units',
			title: 'Unit',
			href: `/units/${unitId || ''}`,
			id: unitId,
		},
		{
			name: 'leases',
			title: 'Lease',
			href: `/leases/${leaseId || ''}`,
			id: leaseId,
		},
		{
			name: 'tenants',
			title: 'Tenant',
			href: `/tenants/${tenantId || ''}`,
			id: tenantId,
		},
	];
</script>

<Breadcrumb skeleton={loading}>
	{#each crumbs as { title, href, name }}
		<BreadcrumbItem isCurrentPage={$page.url.pathname.startsWith(`/${name}`)}>
			<Link sveltekit:prefetch {href}>{title}</Link>
		</BreadcrumbItem>
	{/each}
</Breadcrumb>
