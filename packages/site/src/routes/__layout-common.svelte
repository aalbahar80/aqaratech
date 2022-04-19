<script lang="ts" context="module">
	// This is a base layout for other layouts to extend.

	import { dev } from '$app/env';
	import { navigating, session } from '$app/stores';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import trpc from '$lib/client/trpc';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import { protectRoute } from '$lib/utils/auth';
	import type { Scope } from '@sentry/browser';
	import * as Sentry from '@sentry/browser';
	import { BrowserTracing } from '@sentry/tracing'; // has to be after @sentry/browser
	import { onMount } from 'svelte';
	import 'tippy.js/dist/tippy.css';
	import '../styles/tailwind.css';
	import type { Load } from './__layout-common';

	export const load: Load = async ({ session, url: { pathname }, fetch }) => {
		// @ts-ignore
		trpc.runtime.fetch = fetch;
		return protectRoute(session, pathname);
	};
</script>

<script lang="ts">
	onMount(() => {
		Sentry.init({
			dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
			integrations: [new BrowserTracing()],
			tracesSampleRate: 1.0,
			debug: dev,
			environment: import.meta.env.VITE_VERCEL_ENV ?? 'localBrowser',
		});
		Sentry.configureScope((scope: Scope) => {
			scope.setTag('role', $session.authz?.role || '');
			scope.setUser({
				id: $session.authz?.id || '',
				email: $session.user?.email || '',
				username: $session.user?.name || '',
			});
		});
	});
</script>

<!--  -->
{#if $navigating}
	<PreloadingIndicator />
{/if}

<div>
	{#if import.meta.env.VITE_VERCEL_ENV !== 'production'}
		<Alert />
	{/if}
	<ToastParent />
	<slot />
</div>
