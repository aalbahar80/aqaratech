<script lang="ts" context="module">
	import NavBar from '$components/form/NavBar.svelte';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import type { Load } from '@sveltejs/kit';
	import LogRocket from 'logrocket';
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';
	import '../styles/tailwind.css';

	export const load: Load = () => {
		// if (!session.user) {
		// eslint-disable-next-line no-constant-condition
		if (false) {
			return {
				status: 302,
				redirect: '/auth/login',
				// maxage: 0,
			};
		}

		return {};
	};
</script>

<script lang="ts">
	import { navigating, session } from '$app/stores';

	onMount(() => {
		if (!window.location.href.includes('localhost')) {
			// TODO choose one of posthog or logrocket
			posthog.init('phc_9yCZuf3iVjCaKEH8TDb4sLaN2tg3hnyoIpqRIjGjNiz', {
				api_host: 'https://app.posthog.com',
			});
			posthog.identify($session.userId);
			// posthog.capture('my event', { property: 'value' });

			LogRocket.init('n4p0hb/svelte14dec');
			LogRocket.identify($session.userId);
		}
	});
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<NavBar />
<ToastParent />
<slot />
