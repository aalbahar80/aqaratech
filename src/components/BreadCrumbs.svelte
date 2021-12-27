<script lang="ts">
	import { page } from '$app/stores';
	import { Breadcrumb, ButtonSet } from 'carbon-components-svelte';
	import BreadcrumbItem from 'carbon-components-svelte/src/Breadcrumb/BreadcrumbItem.svelte';
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	import Link from 'carbon-components-svelte/src/Link/Link.svelte';

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
		},
		{
			name: 'properties',
			title: 'Property',
			href: `/properties/${propertyId}`,
		},
		{
			name: 'units',
			title: 'Unit',
			href: `/units/${unitId}`,
		},
		{
			name: 'leases',
			title: 'Lease',
			href: `/leases/${leaseId}`,
		},
		{
			name: 'tenants',
			title: 'Tenant',
			href: `/tenants/${tenantId}`,
		},
	];

	$: id = parseInt($page.params.id);
</script>

<Breadcrumb skeleton={loading}>
	{#each crumbs as { title, href, name }}
		<BreadcrumbItem isCurrentPage={$page.path.startsWith(`/${name}`)}>
			<Link sveltekit:prefetch {href}>{title}</Link>
		</BreadcrumbItem>
	{/each}
</Breadcrumb>

<ButtonSet>
	<Button href={`/${$page.path.split('/')[1]}/${id - 1}`} sveltekit:prefetch
		>Previous</Button
	>
	<Button href={`/${$page.path.split('/')[1]}/${id + 1}`} sveltekit:prefetch
		>Next</Button
	>
</ButtonSet>
