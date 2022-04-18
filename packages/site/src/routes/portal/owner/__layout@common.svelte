<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { session } from '$app/stores';

	const base = `/portal/owner/${$session.authz?.id}`;
	const navigation = [
		{ name: 'Properties', href: base + '/properties' },
		{ name: 'Units', href: base + '/units' },
		// { name: 'Leases', href: base + '/leases' },
		// { name: 'Tenants', href: base + '/tenants' },
		// { name: 'Maintenance', href: base + '/maintenanceOrders' },
	];
</script>

<Navbar {navigation} />
<slot />
