<script lang="ts">
	import { navigating, page } from '$app/stores';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import { environment } from '$lib/environment';
	import SecondaryNavbar from '$lib/components/navbar/SecondaryNavbar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { isSidebarAvailable } from '$lib/components/sidebar/is-sidebar-available';
	import { getNavigationTree } from '$lib/components/sidebar/navigation-tree';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Modal from '$lib/components/toast/Modal.svelte';
	import VersionFooter from '$lib/components/VersionFooter.svelte';
	import { sentryConfig } from '$lib/environment/sentry.config';
	import { getSentryUser } from '$lib/utils/sentry/common';
	import * as Sentry from '@sentry/svelte?client';
	import { BrowserTracing } from '@sentry/tracing?client';
	import { onMount } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import '../styles/tailwind.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	onMount(() => {
		// communicate that the app is ready - used for testing
		document.body.classList.add('started');

		// https://github.com/bluwy/vite-plugin-iso-import#what-happens-if-i-use-an-import-value-that-has-been-stripped-off
		if (!import.meta.env.SSR) {
			Sentry.init({
				...sentryConfig,
				// TODO: use environment variable to set the DSN
				dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
				integrations: [new BrowserTracing()],
			});

			Sentry.configureScope((scope) => {
				scope.setTag('roleType', data.user?.role?.roleType || '');
				scope.setUser(getSentryUser(data.user));
			});
		}
	});
</script>

<svelte:head>
	<title>Aqaratech</title>
	<meta name="description" content="Aqaratech Property Management" />
</svelte:head>

{#if $navigating && !$page.error}
	<PreloadingIndicator />
{/if}
<Toaster />
<Modal />

<SecondaryNavbar />
{#if $page.url.pathname === '/'}
	<slot />
	<VersionFooter />
{:else}
	<div class="grid grid-cols-12">
		{#if isSidebarAvailable($page.url.pathname) && data.user}
			<div class="lg:col-span-3 lg:block xl:col-span-3 2xl:col-span-2">
				<Sidebar navigationTree={getNavigationTree(data.user)} />
			</div>
		{/if}

		<div class="col-span-12 pt-8 lg:col-span-9 xl:col-span-9 2xl:col-span-10">
			<div class="mx-auto flex flex-col space-y-6 px-4 sm:px-6 lg:px-8">
				{#if environment.PUBLIC_AQARATECH_ENV !== 'production'}
					<Alert />
				{/if}
				<slot />
				<VersionFooter />
			</div>
		</div>
	</div>
{/if}
