<script lang="ts" context="module">
	// This is a base layout for other layouts to extend.

	import { navigating } from '$app/stores';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import trpc from '$lib/client/trpc';
	import { init } from '$lib/services/sentry';
	import { protectRoute } from '$lib/utils/auth';
	import type { Scope } from '@sentry/browser';
	import { configureScope } from '@sentry/browser';
	import { onMount } from 'svelte';
	import 'tippy.js/dist/tippy.css';
	import '../styles/tailwind.css';
	import type { Load } from './__layout-common';

	export const load: Load = async ({ session, url: { pathname }, fetch }) => {
		console.log({ session }, '__layout-common.svelte ~ 17');
		init();
		if (session.authz) {
			configureScope((scope: Scope) => {
				scope.setTag('role', session.authz?.role || '');
				scope.setUser({
					id: session.authz?.id || '',
					email: session.user?.email || '',
					username: session.user?.name || '',
				});
			});
		}

		// @ts-ignore
		trpc.runtime.fetch = fetch;
		return protectRoute(session, pathname);
	};
</script>

<!--  -->
<script lang="ts">
	onMount(() => {
		init();
	});
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<div>
	<ToastParent />
	<slot />
</div>
