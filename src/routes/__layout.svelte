<script lang="ts" context="module">
	import type { Load } from './__layout';
	import { protectRoute } from '$lib/utils/auth';

	export const load: Load = async ({ session, url: { pathname } }) => {
		return protectRoute(session, pathname);
	};
</script>

<script lang="ts">
	import { navigating } from '$app/stores';
	import Navbar from '$lib/components/Navbar.svelte';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import '../styles/tailwind.css';
	import 'tippy.js/dist/tippy.css';
	import { onMount } from 'svelte';
	import LogRocket from 'logrocket';
	import posthog from 'posthog-js';

	onMount(() => {
		if (!window.location.href.includes('localhost')) {
			// TODO choose one of posthog or logrocket
			posthog.init('phc_9yCZuf3iVjCaKEH8TDb4sLaN2tg3hnyoIpqRIjGjNiz', {
				api_host: 'https://app.posthog.com',
			});
			// posthog.identify($session.userId);
			// posthog.capture('my event', { property: 'value' });

			LogRocket.init('n4p0hb/svelte14dec');
			// LogRocket.identify($session.userId);
		}
	});
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<div>
	<Navbar />
	<ToastParent />
	<slot />
</div>
