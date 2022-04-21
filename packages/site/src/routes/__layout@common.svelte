<script lang="ts">
	import { session } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import { getUserConfig } from '$user';

	const userConfig = getUserConfig($session.authz?.role, $session.authz?.id);
	const navigation = userConfig.navLinks;
</script>

<Navbar {navigation} />
<slot />
