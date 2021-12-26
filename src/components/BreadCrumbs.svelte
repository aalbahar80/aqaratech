<script lang="ts">
	import { page } from '$app/stores';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { Breadcrumb, ButtonSet } from 'carbon-components-svelte';
	import BreadcrumbItem from 'carbon-components-svelte/src/Breadcrumb/BreadcrumbItem.svelte';
	import { Button } from 'carbon-components-svelte';
	import {
		faBuilding,
		faDoorOpen,
		faFileSignature,
		faUser,
		faFolderOpen,
	} from '@fortawesome/free-solid-svg-icons';
	// TODO: remove defaults
	export let loading: boolean;
	export let clientId: number;
	export let propertyId: number;
	export let unitId: number;
	export let leaseId: number;
	export let tenantId: number;

	const style = 'w-4 h-4 stroke-current';

	$: crumbs = [
		{
			name: 'clients',
			title: 'Client',
			href: `/clients/${clientId}`,
			icon: faFolderOpen,
		},
		{
			name: 'properties',
			title: 'Property',
			href: `/properties/${propertyId}`,
			icon: faBuilding,
		},
		{
			name: 'units',
			title: 'Unit',
			href: `/units/${unitId}`,
			icon: faDoorOpen,
		},
		{
			name: 'leases',
			title: 'Lease',
			href: `/leases/${leaseId}`,
			icon: faFileSignature,
		},
		{
			name: 'tenants',
			title: 'Tenant',
			href: `/tenants/${tenantId}`,
			icon: faUser,
		},
	];

	$: id = parseInt($page.params.id);
</script>

<Breadcrumb skeleton={loading}>
	{#each crumbs as { title, href, name }}
		<BreadcrumbItem {href} isCurrentPage={$page.path.startsWith(`/${name}`)}>
			{title}
		</BreadcrumbItem>
	{/each}
</Breadcrumb>

<ButtonSet>
	<Button href={`/${$page.path.split('/')[1]}/${id - 1}`}>Previous</Button>
	<Button href={`/${$page.path.split('/')[1]}/${id + 1}`}>Next</Button>
</ButtonSet>
