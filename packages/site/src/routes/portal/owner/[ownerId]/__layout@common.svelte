<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { Load } from './__layout@common';

	export const load: Load = async ({ params, stuff }) => {
		const { ownerId } = params;
		console.log({ ownerId }, '__layout@common.svelte ~ 8');
		return {
			stuff: {
				...stuff,
				hrefBase: `/portal/owner/${ownerId}`,
			},
		};
	};
</script>

<script lang="ts">
	const base = $page.stuff.hrefBase;
	console.log({ base }, '__layout@common.svelte ~ 19');
	const navigation = [
		{ name: 'Properties', href: base + '/properties' },
		{ name: 'Units', href: base + '/units' },
		{ name: 'Leases', href: base + '/leases' },
		// { name: 'Tenants', href: base + '/tenants' },
		// { name: 'Maintenance', href: base + '/maintenanceOrders' },
	];
</script>

<Navbar {navigation} />
<slot />
