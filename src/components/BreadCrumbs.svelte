<script lang="ts">
	import { page } from '$app/stores';
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faBuilding,
		faDoorOpen,
		faFileSignature,
		faUser,
		faFolderOpen
	} from '@fortawesome/free-solid-svg-icons';
	// TODO: remove defaults
	export let clientId: number;
	export let propertyId: number;
	export let unitId: number;
	export let leaseId: number;
	export let tenantId: number;

	const style = 'w-4 h-4 stroke-current';

	$: crumbs = [
		{
			name: 'client',
			title: 'Client',
			href: `/clients/${clientId}`,
			icon: faFolderOpen
		},
		{
			name: 'property',
			title: 'Property',
			href: `/properties/${propertyId}`,
			icon: faBuilding
		},
		{
			name: 'unit',
			title: 'Unit',
			href: `/units/${unitId}`,
			icon: faDoorOpen
		},
		{
			name: 'lease',
			title: 'Lease',
			href: `/leases/${leaseId}`,
			icon: faFileSignature
		},
		{
			name: 'tenant',
			title: 'Tenant',
			href: `/tenants/${tenantId}`,
			icon: faUser
		}
	];
</script>

<div class="my-4 text-sm breadcrumbs">
	<ul>
		{#each crumbs as { title, href, icon }}
			<li>
				<a
					{href}
					class="link link-hover"
					class:link-secondary={$page.path == href}
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
