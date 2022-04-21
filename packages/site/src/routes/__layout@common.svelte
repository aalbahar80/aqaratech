<script lang="ts">
	import { session } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import { getUserConfig } from '$user';

	const userConfig = getUserConfig($session.authz?.role, $session.authz?.id);
	const navigation = userConfig.navLinks;
</script>

<Navbar {navigation} />
<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<slot />
</div>
