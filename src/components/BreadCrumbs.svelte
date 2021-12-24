<script lang="ts">
	import { page } from '$app/stores';
	import Fa from 'svelte-fa/src/fa.svelte';
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
</script>

{#if loading}
	<p>placeholder here</p>
{:else}
	<div class="my-4 text-sm breadcrumbs">
		<ul>
			{#each crumbs as { title, href, icon, name }}
				<li>
					<a
						{href}
						class="link link-hover"
						class:link-secondary={$page.path.startsWith(`/${name}`)}
					>
						<div class="mr-2">
							<Fa {icon} />
						</div>

						{title}
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}
