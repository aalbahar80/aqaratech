<script lang="ts">
	import * as Sentry from '@sentry/svelte?client';
	import { BrowserTracing } from '@sentry/tracing?client';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import clsx from 'clsx';
	import { Toaster } from 'svelte-french-toast';

	import { navigating, page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { isLiveEnv } from '@self/utils';

	import '../app.css';

	import L, { setLocale, locale } from '$i18n/i18n-svelte';
	import { baseLocale } from '$i18n/i18n-util';
	import SecondaryNavbar from '$lib/components/navbar/SecondaryNavbar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { getNavigationTree } from '$lib/components/sidebar/navigation-tree';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Modal from '$lib/components/toast/Modal.svelte';
	import { environment } from '$lib/environment';
	import { sentryConfig } from '$lib/environment/sentry.config';
	import HeadHrefLangs from '$lib/i18n/HeadHrefLangs.svelte';
	import { width, widthNumber } from '$lib/stores/width';
	import { isHomeRoute, isSidebarAvailable } from '$lib/utils/route-utils';
	import { getSentryUser } from '$lib/utils/sentry/common';

	export let data: LayoutData;

	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale ?? baseLocale);

	onMount(() => {
		// https://github.com/bluwy/vite-plugin-iso-import#what-happens-if-i-use-an-import-value-that-has-been-stripped-off
		if (!import.meta.env.SSR) {
			Sentry.init({
				...sentryConfig,
				dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
				integrations: [new BrowserTracing()],
			});

			Sentry.configureScope((scope) => {
				scope.setTag('roleType', data.user?.role?.roleType ?? '');
				scope.setUser(getSentryUser(data.user));
			});
		}

		if (!isLiveEnv(environment.PUBLIC_AQARATECH_ENV)) {
			// communicate that the app is ready - used for testing
			document.body.setAttribute('data-testid', 'started');
		}
	});
</script>

<svelte:head>
	<title>Aqaratech</title>
	<meta
		name="description"
		content="Aqaratech Property Management"
	/>
	<HeadHrefLangs />
</svelte:head>

<svelte:window bind:innerWidth={$widthNumber} />

<QueryClientProvider client={data.queryClient}>
	{#if $navigating && !$page.error}
		<PreloadingIndicator />
	{/if}
	<Toaster />
	<Modal />

	<SecondaryNavbar />
	<div
		class:my-grid={isSidebarAvailable($page.route, $widthNumber)}
		class:bg-gray-50={isHomeRoute($page.route)}
		style:padding-top="var(--nav-h)"
	>
		{#if isSidebarAvailable($page.route, $widthNumber)}
			<Sidebar
				navigationTree={getNavigationTree(
					data.user,
					$L,
					$locale,
					data.queryClient,
					$page.route,
					$page.url,
				)}
			/>
		{/if}

		<main class="col-span-full py-8 lg:col-start-2">
			{#if isHomeRoute($page.route)}
				<slot />
			{:else}
				<div
					class={clsx(
						'mx-auto flex flex-col space-y-6 px-4 sm:px-6 lg:px-8',
						$width,
					)}
				>
					<slot />
				</div>
			{/if}
		</main>
	</div>
</QueryClientProvider>

<style>
	.my-grid {
		display: grid;
		grid-template-columns: minmax(0px, 16rem) repeat(1, minmax(0, 1fr));
	}
</style>
