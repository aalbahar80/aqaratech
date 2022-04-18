<script lang="ts" context="module">
	import { session } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';

	const navigation = [
		{ name: 'Clients', href: '/clients' },
		{ name: 'Properties', href: '/properties' },
		{ name: 'Units', href: '/units' },
		{ name: 'Leases', href: '/leases' },
		{ name: 'Tenants', href: '/tenants' },
		// { name: 'Transactions', href: '/transactions' },
		{ name: 'Maintenance', href: '/maintenanceOrders' },
	];
</script>

<Navbar navigation={$session.authz?.isAdmin ? navigation : []} />
<slot />
