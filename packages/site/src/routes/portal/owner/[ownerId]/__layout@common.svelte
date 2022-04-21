<script context="module" lang="ts">
	import { session } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import { getUserConfig } from '$user';
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
	const userConfig = getUserConfig($session.authz?.role, $session.authz?.id);
	const navigation = userConfig.navLinks;
</script>

<Navbar {navigation} />
<slot />
