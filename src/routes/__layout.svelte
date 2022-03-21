<script lang="ts">
	import { navigating } from '$app/stores';
	import NavBar2 from '$lib/components/NavBar2.svelte';
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

<div class="h-full">
	<!-- <NavBar /> -->
	<NavBar2 />
	<ToastParent />
	<slot />
</div>
