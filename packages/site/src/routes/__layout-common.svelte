<script lang="ts" context="module">
	// This is a base layout for other layouts to extend.

	import { navigating } from '$app/stores';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import trpc from '$lib/client/trpc';
	import { protectRoute } from '$lib/utils/auth';
	import LogRocket from 'logrocket';
	import { onMount } from 'svelte';
	import 'tippy.js/dist/tippy.css';
	import '../styles/tailwind.css';
	import type { Load } from './__layout';

	export const load: Load = async ({ session, url: { pathname }, fetch }) => {
		console.log({ pathname }, '__layout-common.svelte ~ 8');
		// @ts-ignore
		trpc.runtime.fetch = fetch;
		return protectRoute(session, pathname);
	};
</script>

<script lang="ts">
	onMount(() => {
		if (!window.location.href.includes('localhost')) {
			LogRocket.init('n4p0hb/svelte14dec');
			// LogRocket.identify($session.userId);
		}
	});
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<div>
	<ToastParent />
	<slot />
</div>
