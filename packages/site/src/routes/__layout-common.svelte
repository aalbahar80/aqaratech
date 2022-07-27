<script lang="ts" context="module">
	// This is a base layout for other layouts to extend.
	import { navigating, page, session } from '$app/stores';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import { api } from '$lib/client/api';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { protectRoute } from '$lib/utils/auth';
	import type { Scope } from '@sentry/browser';
	import * as Sentry from '@sentry/browser';
	import { BrowserTracing } from '@sentry/tracing'; // has to be after @sentry/browser
	import LogRocket from 'logrocket';
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import '../styles/tailwind.css';
	import type { Load } from './__types/__layout-common';

	export const load: Load = async ({
		session,
		stuff,
		fetch,
		url: { pathname },
	}) => {
		const apiClient = api({
			loadFetch: fetch,
			token: session.accessToken,
			roleId: session.user?.role.id,
		});
		return {
			...protectRoute(session, pathname),
			props: {},
			stuff: {
				...stuff,
				api: apiClient,
			},
		};
	};
</script>

<script lang="ts">
	onMount(() => {
		const href = window.location.href;
		if (!href.includes('localhost') && !href.includes('127.0.0.1')) {
			LogRocket.init('n4p0hb/aqaratech');
			if ($session.user) {
				LogRocket.identify($session.user.id || '', {
					email: $session.user.email,
					roleId: $session.user.role.id,
					name: $session.user.fullName || '',
				});
			}

			Sentry.init({
				dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
				integrations: [new BrowserTracing()],
				tracesSampleRate: 0.25,
				// debug: dev,
				environment:
					import.meta.env.VITE_VERCEL_GIT_COMMIT_REF ?? 'localBrowser',
				release:
					import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA ?? 'localBrowserRelease',
			});
			Sentry.configureScope((scope: Scope) => {
				scope.setTag('role', $session.user?.role.roleType || '');
				scope.setUser({
					id: $session.user?.id || '',
					email: $session.user?.email || '',
					name: $session.user?.fullName || '',
				});
			});

			LogRocket.getSessionURL((sessionURL) => {
				Sentry.configureScope((scope) => {
					scope.setExtra('sessionURL', sessionURL);
				});
			});
		}
	});
</script>

<MetaTags
	title="Aqaratech"
	description="Your property at a glance."
	canonical="https://www.aqaratech.com/"
/>

{#if $navigating && !$page.error}
	<PreloadingIndicator />
{/if}

<div>
	{#if import.meta.env.VITE_VERCEL_ENV !== 'production'}
		<Alert />
	{/if}
	<ToastParent />
	<Navbar />
	<slot />
</div>
