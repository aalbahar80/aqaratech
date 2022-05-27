<script lang="ts" context="module">
	// This is a base layout for other layouts to extend.
	import { navigating, page, session } from '$app/stores';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import { trpc } from '$lib/client/trpc';
	import Navbar from '$lib/components/Navbar.svelte';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import type { NavbarItem } from '$lib/models/interfaces/user.interface';
	import { categories, getExpenseCategories } from '$lib/stores/expenseMeta';
	import { protectRoute } from '$lib/utils/auth';
	import { getUserConfig } from '$user';
	import type { Scope } from '@sentry/browser';
	import * as Sentry from '@sentry/browser';
	import { BrowserTracing } from '@sentry/tracing'; // has to be after @sentry/browser
	import LogRocket from 'logrocket';
	import * as R from 'remeda';
	import { onMount } from 'svelte';
	import '../styles/tailwind.css';
	import type { Load } from './__types/__layout-common';

	export const load: Load = async ({
		session,
		url: { pathname },
		fetch,
		stuff,
	}) => {
		const expenseMeta = await trpc(fetch).query('public:expenses:meta');
		categories.set(getExpenseCategories(expenseMeta));

		const userConfig = getUserConfig(session.authz?.role, session.authz?.id);
		const navigation = userConfig.navLinks;
		return {
			...protectRoute(session, pathname),
			props: {
				navigation,
			},
			stuff: {
				...stuff,
				expenseMeta, // TODO: remove this
			},
		};
	};
</script>

<script lang="ts">
	export let navigation: NavbarItem[];
	onMount(() => {
		const href = window.location.href;
		if (!href.includes('localhost') && !href.includes('127.0.0.1')) {
			LogRocket.init('n4p0hb/aqaratech');
			if ($session.authz) {
				LogRocket.identify($session.authz.sub || '', {
					...R.mapValues($session.authz, (v) => v ?? ''),
					...$session.user,
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
				scope.setTag('role', $session.authz?.role || '');
				scope.setUser({
					id: $session.authz?.sub || '',
					email: $session.user?.email || '',
					username: $session.user?.name || '',
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

<svelte:head>
	<!-- <meta http-equiv="refresh" content="3" /> -->
</svelte:head>
{#if $navigating && !$page.error}
	<PreloadingIndicator />
{/if}

<div>
	{#if import.meta.env.VITE_VERCEL_ENV !== 'production'}
		<Alert />
	{/if}
	<ToastParent />
	<Navbar {navigation} />
	<slot />
</div>
