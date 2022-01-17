<script lang="ts">
	import { Breadcrumb } from 'carbon-components-svelte';
	import BreadcrumbItem from 'carbon-components-svelte/src/Breadcrumb/BreadcrumbItem.svelte';
	import Link from 'carbon-components-svelte/src/Link/Link.svelte';
	import { page } from '$app/stores';

	// TODO: remove defaults
	export let crumbs: CrumbData;

	$: crumbsData = [
		{
			name: 'clients',
			title: 'Client',
			href: `/clients/${crumbs?.client || ''}`,
			id: crumbs?.client,
		},
		{
			name: 'properties',
			title: 'Property',
			href: `/properties/${crumbs?.property || ''}`,
			id: crumbs?.property,
		},
		{
			name: 'units',
			title: 'Unit',
			href: `/units/${crumbs?.unit || ''}`,
			id: crumbs?.unit,
		},
		{
			name: 'leases',
			title: 'Lease',
			href: `/leases/${crumbs?.lease || ''}`,
			id: crumbs?.lease,
		},
		{
			name: 'tenants',
			title: 'Tenant',
			href: `/tenants/${crumbs?.tenant || ''}`,
			id: crumbs?.tenant,
		},
		{
			name: 'transactions',
			title: 'Transaction',
			href: `/transactions/${crumbs?.transaction || ''}`,
			id: crumbs?.transaction,
		},
	];
</script>

<Breadcrumb noTrailingSlash>
	{#each crumbsData as { title, href, name, id }}
		{#if id}
			<BreadcrumbItem isCurrentPage={$page.url.pathname.startsWith(`/${name}`)}>
				<Link sveltekit:prefetch {href}>{title}</Link>
			</BreadcrumbItem>
		{/if}
	{/each}
</Breadcrumb>
