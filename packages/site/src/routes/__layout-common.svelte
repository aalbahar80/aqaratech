<script lang="ts" context="module">
	// This is a base layout for other layouts to extend.

	import { navigating } from '$app/stores';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import trpc from '$lib/client/trpc';
	import { protectRoute } from '$lib/utils/auth';
	import type { Scope } from '@sentry/browser';
	import * as Sentry from '@sentry/browser';
	import { configureScope } from '@sentry/browser';
	import { BrowserTracing } from '@sentry/tracing';
	import { onMount } from 'svelte';
	import 'tippy.js/dist/tippy.css';
	import '../styles/tailwind.css';
	import type { Load } from './__layout-common';

	export const load: Load = async ({ session, url: { pathname }, fetch }) => {
		console.log({ session }, '__layout-common.svelte ~ 17');
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

<script lang="ts">
	import { session } from '$app/stores';
	onMount(() => {
		Sentry.init({
			dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
			integrations: [new BrowserTracing()],
			tracesSampleRate: 1.0,
		});
		configureScope((scope: Scope) => {
			scope.setTag('role', $session.authz?.role || '');
			scope.setUser({
				id: $session.authz?.id || '',
				email: $session.user?.email || '',
				username: $session.user?.name || '',
			});
		});
	});
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<div>
	<ToastParent />
	<slot />
</div>
