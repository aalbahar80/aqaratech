<script lang="ts" context="module">
	import { navigating } from '$app/stores';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import trpc from '$lib/client/trpc';
	import Navbar from '$lib/components/Navbar.svelte';
	import { protectRoute } from '$lib/utils/auth';
	import LogRocket from 'logrocket';
	import { onMount } from 'svelte';
	import 'tippy.js/dist/tippy.css';
	import '../styles/tailwind.css';
	import type { Load } from './__layout';

	export const load: Load = async ({ session, url: { pathname }, fetch }) => {
		// @ts-ignore
		trpc.runtime.fetch = fetch;
		// return protectRoute(session, pathname);
		return {};
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
	<Navbar />
	<ToastParent />
	<slot />
</div>
