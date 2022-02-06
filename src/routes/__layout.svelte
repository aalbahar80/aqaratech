<script lang="ts" context="module">
	import { navigating, session } from '$app/stores';
	import NavBar from '$components/form/NavBar.svelte';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import { logger } from '$lib/config/logger';
	import type { Load } from '@sveltejs/kit';
	import LogRocket from 'logrocket';
	import posthog from 'posthog-js';
	import { onMount } from 'svelte';
	import '../styles/tailwind.css';
	// import PrismaClient from '$lib/config/prisma';

	export const load: Load = async ({ fetch, session }) => {
		logger.debug(!session.user, '__layout.svelte ~ 27');
		// if (!session.user) {
		if (false) {
			return {
				status: 302,
				redirect: '/auth/login',
				// maxage: 0,
			};
		}
		logger.debug(session.userId, '__layout.svelte ~ 38');

		return {};
	};
</script>

<script lang="ts">
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

<div class="max-h-screen">
	<NavBar />
	<div class="mx-4 mt-8 lg:mx-8">
		<ToastParent />
		<slot />
	</div>
</div>
